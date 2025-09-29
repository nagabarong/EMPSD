const BasePage = require('./BasePage');

class LoadForecastPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Page elements
    this.selectors = {
      pageTitle: 'h1, h2, [data-testid="page-title"]',
      loadForecastHeading: 'h1:has-text("Prakiraan Beban"), h2:has-text("Prakiraan Beban"), [data-testid="load-forecast-heading"]',
      breadcrumb: '.breadcrumb, [data-testid="breadcrumb"], nav.text-dark-300',
      navigationMenu: 'nav, .navigation, .sidebar',
      mainContent: 'main, .main-content, .load-forecast-content',
      
      // Period selector in header
      periodSelector: 'select:has-text("Periode"), [data-testid="period-selector"]',
      periodDropdown: '.period-dropdown, [data-testid="period-dropdown"]',
      
      // Filter elements for the graph
      regionalFilter: 'input[placeholder*="Cari regional"], select:has-text("Regional")',
      uidFilter: 'input[placeholder*="Cari UID/UIW"], select:has-text("UID/UIW")',
      up3Filter: 'input[placeholder*="Cari UP3/UP2D"], select:has-text("UP3/UP2D")',
      
      // Graph elements
      graphTitle: 'h3:has-text("Grafik Beban Puncak"), .graph-title',
      graphContainer: '.graph-container, [data-testid="graph-container"]',
      graphLegend: '.graph-legend, [data-testid="graph-legend"]',
      trafoGILegend: '.legend-item:has-text("Trafo GI"), [data-testid="trafo-gi-legend"]',
      penyulangLegend: '.legend-item:has-text("Penyulang"), [data-testid="penyulang-legend"]',
      
      // Chart elements
      chartContainer: '[data-testid="chart-container"], .chart-container, .load-forecast-chart',
      chartCanvas: 'canvas, .chart-canvas',
      chartLegend: '.chart-legend, [data-testid="chart-legend"]',
      
      // Data cards at bottom
      dataCards: '.data-cards, [data-testid="data-cards"]',
      kttCustomerCard: '.card:has-text("Penambahan Pelanggan KTT"), [data-testid="ktt-customer-card"]',
      kttCustomerCount: '.card:has-text("Pelanggan"), [data-testid="ktt-customer-count"]',
      kttCapacity: '.card:has-text("Kapasitas"), [data-testid="ktt-capacity"]',
      derAdditionCard: '.card:has-text("Penambahan DER"), [data-testid="der-addition-card"]',
      derUnitCount: '.card:has-text("Unit"), [data-testid="der-unit-count"]',
      
      // Table elements
      dataTable: '[data-testid="data-table"], .data-table, table',
      tableRows: '[data-testid="data-table"] tbody tr, .data-table tbody tr, table tbody tr',
      
      // Filter controls
      filterButton: 'button:has-text("Filter"), [data-testid="filter-button"]',
      resetButton: 'button:has-text("Reset"), [data-testid="reset-button"]',
      
      // Export controls
      exportButton: 'button:has-text("Export"), [data-testid="export-button"]',
      exportExcel: 'button:has-text("Excel"), [data-testid="export-excel"]',
      exportPDF: 'button:has-text("PDF"), [data-testid="export-pdf"]',
      exportCSV: 'button:has-text("CSV"), [data-testid="export-csv"]',
      
      // Refresh
      refreshButton: 'button:has-text("Refresh"), [data-testid="refresh-button"]',
      
      // Pagination controls
      pagination: '.pagination, nav[aria-label="pagination"], [data-testid="pagination"]',
      nextPage: 'button[aria-label="Next"], .pagination-next, [data-testid="next-page"]',
      prevPage: 'button[aria-label="Previous"], .pagination-prev, [data-testid="prev-page"]',
      
      // Sidebar navigation
      sidebar: '.sidebar, [data-testid="sidebar"]',
      sidebarLogo: '.sidebar-logo, [data-testid="sidebar-logo"]',
      overviewSection: '.overview-section, [data-testid="overview-section"]',
      dashboardLink: 'a:has-text("Dashboard"), [data-testid="dashboard-link"]',
      loadForecastLink: 'a:has-text("Prakiraan Beban"), [data-testid="load-forecast-link"]',
      loadForecastSubmenu: '.submenu, [data-testid="load-forecast-submenu"]',
      ringkasanLink: 'a:has-text("Ringkasan"), [data-testid="ringkasan-link"]',
      pertumbuhanBebanLink: 'a:has-text("Pertumbuhan Beban"), [data-testid="pertumbuhan-beban-link"]',
      // Removed other submenu links temporarily per current scope
      
      // Settings section
      settingsSection: '.settings-section, [data-testid="settings-section"]',
      periodeLink: 'a:has-text("Periode"), [data-testid="periode-link"]',
      otorisasiLink: 'a:has-text("Otorisasi"), [data-testid="otorisasi-link"]',
      penggunaLink: 'a:has-text("Pengguna"), [data-testid="pengguna-link"]',
      regionalLink: 'a:has-text("Regional"), [data-testid="regional-link"]',
      uidLink: 'a:has-text("UID/UIW"), [data-testid="uid-link"]',
      up3Link: 'a:has-text("UP3/UP2D"), [data-testid="up3-link"]',
      
      // Loading and error states
      loadingSpinner: '.loading, .spinner, [data-testid="loading"]',
      errorMessage: '.error-message, [data-testid="error-message"]',
      noDataMessage: '.no-data, [data-testid="no-data"]'
    };

    // Alternative selectors using Playwright's getByRole
    this.locators = {
      pageTitle: () => this.page.locator('h1, h2, [data-testid="page-title"]'),
      loadForecastHeading: () => this.getByRole('heading', { name: /prakiraan beban|load forecast/i }),
      breadcrumb: () => this.page.locator('.breadcrumb, [data-testid="breadcrumb"], nav.text-dark-300'),
      breadcrumbDashboardLink: () => this.page.locator('nav.text-dark-300 a:has-text("Dashboard")'),
      breadcrumbCurrent: () => this.page.locator('nav.text-dark-300 span:has-text("Ringkasan")'),
      navigationMenu: () => this.page.locator('nav, .navigation, .sidebar'),
      mainContent: () => this.page.locator('main, .main-content, .load-forecast-content'),
      
      // Period selector
      periodSelector: () => this.page.locator('select:has-text("Periode"), [data-testid="period-selector"]'),
      periodDropdown: () => this.page.locator('.period-dropdown, [data-testid="period-dropdown"]'),
      
      // Filter elements for the graph
      regionalFilter: () => this.page.locator('input[placeholder*="Cari regional"], select:has-text("Regional")'),
      uidFilter: () => this.page.locator('input[placeholder*="Cari UID/UIW"], select:has-text("UID/UIW")'),
      up3Filter: () => this.page.locator('input[placeholder*="Cari UP3/UP2D"], select:has-text("UP3/UP2D")'),
      
      // Graph elements
      graphTitle: () => this.page.locator('h3:has-text("Grafik Beban Puncak"), .graph-title'),
      graphContainer: () => this.page.locator('.graph-container, [data-testid="graph-container"]'),
      graphLegend: () => this.page.locator('.graph-legend, [data-testid="graph-legend"]'),
      trafoGILegend: () => this.page.locator('.legend-item:has-text("Trafo GI"), [data-testid="trafo-gi-legend"]'),
      penyulangLegend: () => this.page.locator('.legend-item:has-text("Penyulang"), [data-testid="penyulang-legend"]'),
      
      // Data cards
      dataCards: () => this.page.locator('.data-cards, [data-testid="data-cards"]'),
      kttCustomerCard: () => this.page.locator('.card:has-text("Penambahan Pelanggan KTT"), [data-testid="ktt-customer-card"]'),
      kttCustomerCount: () => this.page.locator('.card:has-text("Pelanggan"), [data-testid="ktt-customer-count"]'),
      kttCapacity: () => this.page.locator('.card:has-text("Kapasitas"), [data-testid="ktt-capacity"]'),
      derAdditionCard: () => this.page.locator('.card:has-text("Penambahan DER"), [data-testid="der-addition-card"]'),
      derUnitCount: () => this.page.locator('.card:has-text("Unit"), [data-testid="der-unit-count"]'),
      
      // Table elements
      dataTable: () => this.page.locator('[data-testid="data-table"], .data-table, table'),
      tableRows: () => this.page.locator('[data-testid="data-table"] tbody tr, .data-table tbody tr, table tbody tr'),
      
      // Sidebar navigation
      sidebar: () => this.page.locator('.sidebar, [data-testid="sidebar"]'),
      sidebarLogo: () => this.page.locator('.sidebar-logo, [data-testid="sidebar-logo"]'),
      overviewSection: () => this.page.locator('.overview-section, [data-testid="overview-section"]'),
      dashboardLink: () => this.page.locator('a:has-text("Dashboard"), [data-testid="dashboard-link"]'),
      loadForecastLink: () => this.page.locator('a:has-text("Prakiraan Beban"), [data-testid="load-forecast-link"]'),
      loadForecastSubmenu: () => this.page.locator('.submenu, [data-testid="load-forecast-submenu"]'),
      ringkasanLink: () => this.page.locator('a:has-text("Ringkasan"), [data-testid="ringkasan-link"]'),
      pertumbuhanBebanLink: () => this.page.locator('a:has-text("Pertumbuhan Beban"), [data-testid="pertumbuhan-beban-link"]'),
      // Removed other submenu locators temporarily per current scope
      
      // Settings section
      settingsSection: () => this.page.locator('.settings-section, [data-testid="settings-section"]'),
      periodeLink: () => this.page.locator('a:has-text("Periode"), [data-testid="periode-link"]'),
      otorisasiLink: () => this.page.locator('a:has-text("Otorisasi"), [data-testid="otorisasi-link"]'),
      penggunaLink: () => this.page.locator('a:has-text("Pengguna"), [data-testid="pengguna-link"]'),
      regionalLink: () => this.page.locator('a:has-text("Regional"), [data-testid="regional-link"]'),
      uidLink: () => this.page.locator('a:has-text("UID/UIW"), [data-testid="uid-link"]'),
      up3Link: () => this.page.locator('a:has-text("UP3/UP2D"), [data-testid="up3-link"]'),
      
      // Loading and error states
      loadingSpinner: () => this.page.locator('.loading, .spinner, [data-testid="loading"]'),
      errorMessage: () => this.page.locator('.error-message, [data-testid="error-message"]'),
      noDataMessage: () => this.page.locator('.no-data, [data-testid="no-data"]')
    };
  }

  // Internal helper methods to reduce repeated try/catch patterns
  async _isVisible(locatorFactory, selector) {
    try {
      return await locatorFactory().isVisible();
    } catch (error) {
      return await this.isVisible(selector);
    }
  }

  async _getText(locatorFactory, selector) {
    try {
      return await locatorFactory().textContent();
    } catch (error) {
      return await this.getText(selector);
    }
  }

  async _click(locatorFactory, selector) {
    try {
      await locatorFactory().click();
    } catch (error) {
      await this.click(selector);
    }
  }

  async _fill(locatorFactory, selector, value) {
    try {
      await locatorFactory().fill(value);
    } catch (error) {
      await this.fill(selector, value);
    }
  }

  async _selectOption(locatorFactory, selector, value) {
    try {
      await locatorFactory().selectOption(value);
    } catch (error) {
      await this.page.selectOption(selector, value);
    }
  }

  /**
   * Navigate to load forecast page by clicking the sidebar button
   */
  async navigateToLoadForecast() {
    // Click on the "Prakiraan Beban" button in sidebar
    try {
      await this.getByRole('button', { name: 'Prakiraan Beban' }).click();
      await this.waitForPageLoad();
    } catch (error) {
      console.log('Error clicking Prakiraan Beban button:', error.message);
      // Fallback to direct navigation
      const testData = require('../testdata/testData');
      await this.goto(testData.urls.loadForecastUrl);
      await this.waitForPageLoad();
    }
  }

  /**
   * Navigate to specific load forecast submenu
   * @param {string} submenuName - Name of the submenu to click
   */
  async navigateToSubmenu(submenuName) {
    await this.wait(1000);
    await this.getByRole('button', { name: 'Prakiraan Beban' }).click();
    await this.getByRole('link', { name: submenuName }).click();
    await this.waitForPageLoad();
  }

  /**
   * Check if load forecast heading is visible
   * @returns {Promise<boolean>} True if heading is visible
   */
  async isLoadForecastHeadingVisible() {
    return await this._isVisible(this.locators.loadForecastHeading, this.selectors.loadForecastHeading);
  }

  /**
   * Check if main content is visible
   * @returns {Promise<boolean>} True if main content is visible
   */
  async isMainContentVisible() {
    return await this._isVisible(this.locators.mainContent, this.selectors.mainContent);
  }

  /**
   * Check if breadcrumb is visible
   * @returns {Promise<boolean>} True if breadcrumb is visible
   */
  async isBreadcrumbVisible() {
    return await this._isVisible(this.locators.breadcrumb, this.selectors.breadcrumb);
  }

  /**
   * Get breadcrumb text
   * @returns {Promise<string>} Breadcrumb text
   */
  async getBreadcrumbText() {
    return await this._getText(this.locators.breadcrumb, this.selectors.breadcrumb);
  }

  /**
   * Check breadcrumb Dashboard link visibility
   */
  async isBreadcrumbDashboardVisible() {
    try {
      return await this.locators.breadcrumbDashboardLink().isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Check breadcrumb current item visibility (Ringkasan)
   */
  async isBreadcrumbCurrentVisible() {
    try {
      return await this.locators.breadcrumbCurrent().isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if period selector is visible
   * @returns {Promise<boolean>} True if period selector is visible
   */
  async isPeriodSelectorVisible() {
    return await this._isVisible(this.locators.periodSelector, this.selectors.periodSelector);
  }

  /**
   * Select period from dropdown
   * @param {string} period - Period to select (e.g., "2034 - 2043")
   */
  async selectPeriod(period) {
    await this._selectOption(this.locators.periodSelector, this.selectors.periodSelector, period);
  }

  /**
   * Check if graph title is visible
   * @returns {Promise<boolean>} True if graph title is visible
   */
  async isGraphTitleVisible() {
    return await this._isVisible(this.locators.graphTitle, this.selectors.graphTitle);
  }

  /**
   * Get graph title text
   * @returns {Promise<string>} Graph title text
   */
  async getGraphTitleText() {
    return await this._getText(this.locators.graphTitle, this.selectors.graphTitle);
  }

  /**
   * Check if graph container is visible
   * @returns {Promise<boolean>} True if graph is visible
   */
  async isGraphContainerVisible() {
    return await this._isVisible(this.locators.graphContainer, this.selectors.graphContainer);
  }

  /**
   * Check if graph legend is visible
   * @returns {Promise<boolean>} True if legend is visible
   */
  async isGraphLegendVisible() {
    return await this._isVisible(this.locators.graphLegend, this.selectors.graphLegend);
  }

  /**
   * Check if Trafo GI legend is visible
   * @returns {Promise<boolean>} True if Trafo GI legend is visible
   */
  async isTrafoGILegendVisible() {
    return await this._isVisible(this.locators.trafoGILegend, this.selectors.trafoGILegend);
  }

  /**
   * Check if Penyulang legend is visible
   * @returns {Promise<boolean>} True if Penyulang legend is visible
   */
  async isPenyulangLegendVisible() {
    return await this._isVisible(this.locators.penyulangLegend, this.selectors.penyulangLegend);
  }

  /**
   * Get load forecast heading text
   * @returns {Promise<string>} Heading text
   */
  async getLoadForecastHeadingText() {
    return await this._getText(this.locators.loadForecastHeading, this.selectors.loadForecastHeading);
  }

  /**
   * Check if chart container is visible
   * @returns {Promise<boolean>} True if chart is visible
   */
  async isChartVisible() {
    return await this._isVisible(this.locators.chartContainer, this.selectors.chartContainer);
  }

  /**
   * Check if data table is visible
   * @returns {Promise<boolean>} True if table is visible
   */
  async isDataTableVisible() {
    return await this._isVisible(this.locators.dataTable, this.selectors.dataTable);
  }

  /**
   * Set regional filter
   * @param {string} region - Region to search/select
   */
  async setRegionalFilter(region) {
    await this._fill(this.locators.regionalFilter, this.selectors.regionalFilter, region);
  }

  /**
   * Set UID/UIW filter
   * @param {string} uid - UID/UIW to search/select
   */
  async setUIDFilter(uid) {
    await this._fill(this.locators.uidFilter, this.selectors.uidFilter, uid);
  }

  /**
   * Set UP3/UP2D filter
   * @param {string} up3 - UP3/UP2D to search/select
   */
  async setUP3Filter(up3) {
    await this._fill(this.locators.up3Filter, this.selectors.up3Filter, up3);
  }

  /**
   * Check if data cards are visible
   * @returns {Promise<boolean>} True if data cards are visible
   */
  async isDataCardsVisible() {
    return await this._isVisible(this.locators.dataCards, this.selectors.dataCards);
  }

  /**
   * Check if KTT Customer card is visible
   * @returns {Promise<boolean>} True if KTT Customer card is visible
   */
  async isKTTCustomerCardVisible() {
    return await this._isVisible(this.locators.kttCustomerCard, this.selectors.kttCustomerCard);
  }

  /**
   * Get KTT Customer count
   * @returns {Promise<string>} KTT Customer count text
   */
  async getKTTCustomerCount() {
    return await this._getText(this.locators.kttCustomerCount, this.selectors.kttCustomerCount);
  }

  /**
   * Get KTT Capacity text
   * @returns {Promise<string>} KTT Capacity text
   */
  async getKTTCapacity() {
    return await this._getText(this.locators.kttCapacity, this.selectors.kttCapacity);
  }

  /**
   * Check if DER Addition card is visible
   * @returns {Promise<boolean>} True if DER Addition card is visible
   */
  async isDERAdditionCardVisible() {
    return await this._isVisible(this.locators.derAdditionCard, this.selectors.derAdditionCard);
  }

  /**
   * Get DER Unit count
   * @returns {Promise<string>} DER Unit count text
   */
  async getDERUnitCount() {
    return await this._getText(this.locators.derUnitCount, this.selectors.derUnitCount);
  }

  /**
   * Apply filters
   */
  async applyFilters() {
    await this._click(this.locators.filterButton, this.selectors.filterButton);
    await this.wait(1000); // Wait for data to load
  }

  /**
   * Reset filters
   */
  async resetFilters() {
    await this._click(this.locators.resetButton, this.selectors.resetButton);
    await this.wait(1000); // Wait for reset to complete
  }

  /**
   * Check if loading spinner is visible
   * @returns {Promise<boolean>} True if loading
   */
  async isLoading() {
    return await this._isVisible(this.locators.loadingSpinner, this.selectors.loadingSpinner);
  }

  /**
   * Wait for data to load
   */
  async waitForDataLoad() {
    // Wait for loading to finish
    await this.page.waitForFunction(() => {
      const loading = document.querySelector('.loading, .spinner, [data-testid="loading"]');
      return !loading || loading.style.display === 'none';
    }, { timeout: 30000 });
    
    // Wait for chart or table to be visible
    await this.page.waitForFunction(() => {
      const chart = document.querySelector('[data-testid="chart-container"], .chart-container, .load-forecast-chart');
      const table = document.querySelector('[data-testid="data-table"], .data-table, table');
      return chart || table;
    }, { timeout: 10000 });
  }

  /**
   * Wait until breadcrumb contains the expected text
   * @param {string} text - Expected breadcrumb text (case-insensitive)
   */
  async waitForBreadcrumb(text) {
    await this.page.waitForFunction(
      ({ selector, expected }) => {
        const el = document.querySelector(selector);
        if (!el) return false;
        const content = (el.textContent || '').toLowerCase();
        return content.includes((expected || '').toLowerCase());
      },
      { selector: this.selectors.breadcrumb, expected: text },
      { timeout: 30000 }
    );
  }

  /**
   * Get table data
   * @returns {Promise<Array>} Array of table rows data
   */
  async getTableData() {
    const rows = await this.locators.tableRows().all();
    const data = [];
    
    for (const row of rows) {
      const cells = await row.locator('td, .table-data').all();
      const rowData = [];
      
      for (const cell of cells) {
        const text = await cell.textContent();
        rowData.push(text.trim());
      }
      
      if (rowData.length > 0) {
        data.push(rowData);
      }
    }
    
    return data;
  }

  /**
   * Click export button
   */
  async clickExportButton() {
    await this._click(this.locators.exportButton, this.selectors.exportButton);
  }

  /**
   * Export data as Excel
   */
  async exportAsExcel() {
    await this.clickExportButton();
    await this._click(this.locators.exportExcel, this.selectors.exportExcel);
  }

  /**
   * Export data as PDF
   */
  async exportAsPDF() {
    await this.clickExportButton();
    await this._click(this.locators.exportPDF, this.selectors.exportPDF);
  }

  /**
   * Export data as CSV
   */
  async exportAsCSV() {
    await this.clickExportButton();
    await this._click(this.locators.exportCSV, this.selectors.exportCSV);
  }

  /**
   * Refresh data
   */
  async refreshData() {
    await this._click(this.locators.refreshButton, this.selectors.refreshButton);
    await this.waitForDataLoad();
  }

  /**
   * Check if pagination is visible
   * @returns {Promise<boolean>} True if pagination is visible
   */
  async isPaginationVisible() {
    return await this._isVisible(this.locators.pagination, this.selectors.pagination);
  }

  /**
   * Go to next page
   */
  async goToNextPage() {
    await this._click(this.locators.nextPage, this.selectors.nextPage);
    await this.waitForDataLoad();
  }

  /**
   * Go to previous page
   */
  async goToPreviousPage() {
    await this._click(this.locators.prevPage, this.selectors.prevPage);
    await this.waitForDataLoad();
  }

  /**
   * Verify load forecast page loaded successfully
   * @returns {Promise<boolean>} True if page loaded successfully
   */
  async verifyPageLoaded() {
    try {
      // Check if we're on the correct page by looking for key elements
      const isHeadingVisible = await this.isLoadForecastHeadingVisible();
      
      // Check if we can find any main content area
      const isMainContentVisible = await this.isVisible(this.selectors.mainContent);
      
      // At least the heading should be visible
      return isHeadingVisible;
    } catch (error) {
      console.log('Error verifying page load:', error.message);
      return false;
    }
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error is visible
   */
  async hasErrorMessage() {
    return await this._isVisible(this.locators.errorMessage, this.selectors.errorMessage);
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message
   */
  async getErrorMessage() {
    return await this._getText(this.locators.errorMessage, this.selectors.errorMessage);
  }

  /**
   * Check if no data message is visible
   * @returns {Promise<boolean>} True if no data message is visible
   */
  async hasNoDataMessage() {
    return await this._isVisible(this.locators.noDataMessage, this.selectors.noDataMessage);
  }

  /**
   * Get no data message text
   * @returns {Promise<string>} No data message
   */
  async getNoDataMessage() {
    return await this._getText(this.locators.noDataMessage, this.selectors.noDataMessage);
  }
}

module.exports = LoadForecastPage;
