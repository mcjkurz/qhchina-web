/**
 * Simple vanilla JS search for qhchina package documentation.
 * Searches function and class names, displays matching results.
 */

(function() {
  'use strict';

  let searchIndex = null;
  let searchInput = null;
  let searchResults = null;
  let isInitialized = false;

  /**
   * Initialize the search functionality.
   */
  async function initSearch() {
    searchInput = document.getElementById('docs-search-input');
    searchResults = document.getElementById('docs-search-results');

    if (!searchInput || !searchResults) {
      console.warn('Search elements not found');
      return;
    }

    // Fetch the search index
    try {
      const response = await fetch('/assets/search-index.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      searchIndex = await response.json();
      isInitialized = true;
    } catch (error) {
      console.error('Failed to load search index:', error);
    }

    // Set up event listeners
    searchInput.addEventListener('input', debounce(handleSearch, 150));
    searchInput.addEventListener('focus', handleFocus);
    searchInput.addEventListener('keydown', handleKeydown);

    // Close results when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        hideResults();
      }
    });
  }

  /**
   * Debounce function to limit search frequency.
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Handle search input changes.
   */
  function handleSearch() {
    if (!isInitialized || !searchIndex) {
      return;
    }

    const query = searchInput.value.trim().toLowerCase();

    if (query.length < 2) {
      hideResults();
      return;
    }

    // Search for matches
    const matches = searchIndex.filter(item => {
      const name = item.name.toLowerCase();
      return name.includes(query);
    });

    // Sort matches: exact matches first, then by name length
    matches.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aExact = aName.startsWith(query);
      const bExact = bName.startsWith(query);

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return aName.length - bName.length;
    });

    displayResults(matches.slice(0, 10));
  }

  /**
   * Display search results.
   */
  function displayResults(matches) {
    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
      showResults();
      return;
    }

    const html = matches.map(item => `
      <a href="${item.url}" class="search-result-item">
        <span class="search-result-name">${escapeHtml(item.name)}</span>
        <span class="search-result-module">${escapeHtml(item.module)}</span>
      </a>
    `).join('');

    searchResults.innerHTML = html;
    showResults();
  }

  /**
   * Show the results dropdown.
   */
  function showResults() {
    searchResults.classList.add('visible');
  }

  /**
   * Hide the results dropdown.
   */
  function hideResults() {
    searchResults.classList.remove('visible');
  }

  /**
   * Handle focus on search input.
   */
  function handleFocus() {
    const query = searchInput.value.trim();
    if (query.length >= 2 && searchResults.innerHTML) {
      showResults();
    }
  }

  /**
   * Handle keyboard navigation.
   */
  function handleKeydown(e) {
    const items = searchResults.querySelectorAll('.search-result-item');
    const activeItem = searchResults.querySelector('.search-result-item.active');
    let currentIndex = Array.from(items).indexOf(activeItem);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (items.length > 0) {
          if (activeItem) activeItem.classList.remove('active');
          currentIndex = (currentIndex + 1) % items.length;
          items[currentIndex].classList.add('active');
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (items.length > 0) {
          if (activeItem) activeItem.classList.remove('active');
          currentIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
          items[currentIndex].classList.add('active');
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (activeItem) {
          window.location.href = activeItem.href;
        } else if (items.length > 0) {
          window.location.href = items[0].href;
        }
        break;

      case 'Escape':
        hideResults();
        searchInput.blur();
        break;
    }
  }

  /**
   * Escape HTML to prevent XSS.
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();

/**
 * Collapsible submenu functionality for docs sidebar.
 * Only active on desktop (min-width: 769px).
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'docs-submenu-collapsed';

  /**
   * Check if we're on desktop (submenu toggle is visible).
   */
  function isDesktop() {
    return window.matchMedia('(min-width: 769px)').matches;
  }

  /**
   * Get saved collapse state from localStorage.
   */
  function getSavedState() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  /**
   * Save collapse state to localStorage.
   */
  function saveState(collapsed) {
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? 'true' : 'false');
    } catch (e) {
      // Ignore storage errors
    }
  }

  /**
   * Initialize submenu toggle functionality.
   */
  function initSubmenuToggle() {
    const toggleButtons = document.querySelectorAll('.submenu-toggle');
    
    if (toggleButtons.length === 0) {
      return;
    }
    
    console.log('Submenu toggle initialized, found', toggleButtons.length, 'buttons');

    toggleButtons.forEach(function(button) {
      const submenu = button.closest('li').querySelector('.docs-submenu');
      
      if (!submenu) {
        return;
      }

      // Restore saved state on desktop
      if (isDesktop() && getSavedState()) {
        submenu.classList.add('collapsed');
        button.setAttribute('aria-expanded', 'false');
      }

      // Handle toggle click
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const isCollapsed = submenu.classList.contains('collapsed');
        
        if (isCollapsed) {
          // Expand
          submenu.classList.remove('collapsed');
          button.setAttribute('aria-expanded', 'true');
          saveState(false);
        } else {
          // Collapse
          submenu.classList.add('collapsed');
          button.setAttribute('aria-expanded', 'false');
          saveState(true);
        }
      });
    });

    // Handle window resize - ensure submenu is visible on mobile
    window.addEventListener('resize', debounceResize(function() {
      if (!isDesktop()) {
        // On mobile, always show submenu (remove collapsed state)
        toggleButtons.forEach(function(button) {
          const submenu = button.closest('li').querySelector('.docs-submenu');
          if (submenu) {
            submenu.classList.remove('collapsed');
          }
        });
      } else {
        // On desktop, restore saved state
        if (getSavedState()) {
          toggleButtons.forEach(function(button) {
            const submenu = button.closest('li').querySelector('.docs-submenu');
            if (submenu) {
              submenu.classList.add('collapsed');
              button.setAttribute('aria-expanded', 'false');
            }
          });
        }
      }
    }, 150));
  }

  /**
   * Simple debounce for resize events.
   */
  function debounceResize(func, wait) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSubmenuToggle);
  } else {
    initSubmenuToggle();
  }
})();
