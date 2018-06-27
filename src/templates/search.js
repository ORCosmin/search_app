import I18n from '../javascript/lib/i18n.js'
import {templatingLoop as loop, escapeSpecialChars as escape} from '../javascript/lib/helpers.js'
const getSuggestionsListTemplate = (suggestions) => {
  return loop(
    suggestions,
    suggestion => `<a href class="c-tag u-mr-xs suggestion">${escape(suggestion)}</a>`
  )
}

const getBrandsDropdownTemplate = (args) => {
  if (args.hasMultiplebBrands) {
    return `
      <div class="advanced-option">
        <label class="c-txt__label" for="brand-filter">${I18n.t('brand_filter.brand')}</label>
        <select name="brand-filter" id="brand-filter" class="c-txt__input c-txt__input--select">
          <option value="">${I18n.t('brand_filter.all_brands')}</option>
          ${getBrandsOptionsTemplate(args.brands)}
        </select>
      </div>
    `
  }
}

const getBrandsOptionsTemplate = (brands) => {
  return loop(
    brands,
    brand => `<option value='${brand.value}' ${brand.selected ? 'selected' : ''}>${escape(brand.label)}</option>`
  )
}

export default function (args) {
  return (
    `
  <div class="search-app">
    <div class="search-container">
      <form action="" class="search">
        <fieldset class="u-mb-sm">
          <label class="c-txt__label" for="type">${I18n.t('search.search')}</label>
          <select name="type" id="type" class="c-txt__input c-txt__input--select">
            <option value="all">${I18n.t('search.type.all')}</option>
            <option value="ticket">${I18n.t('search.type.tickets')}</option>
            <option value="article">${I18n.t('search.type.articles')}</option>
            <option value="user">${I18n.t('search.type.people')}</option>
            <option value="organization">${I18n.t('search.type.organizations')}</option>
            <option value="entry">${I18n.t('search.type.topics')}</option>
          </select>
        </fieldset>
        <fieldset class="u-mb-sm">
          <div class="c-txt__input u-display-flex">
            <input class="c-txt__input c-txt__input--bare search-box" placeholder="Type search term here" type="text" autocomplete="off">
            <button type="button" id="search-submit" class="c-btn c-btn--icon c-btn--sm c-btn--basic c-btn--muted">
              <svg viewBox="0 0 26 26" id="zd-svg-icon-26-search" width="100%" height="100%"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><path d="M16 16l6 6"></path></g></svg>
            </button>
          </div>
        </fieldset>
        <fieldset class="u-mb-sm suggestions">
          ${getSuggestionsListTemplate(args.suggestions)}
        </fieldset>
        <fieldset class="u-mb-sm u-ta-right c-chk">
          <input class="c-chk__input" id="advanced-field-toggle" type="checkbox">
          <label class="c-chk__label c-chk__label--toggle" for="advanced-field-toggle"><span dir="ltr">Advanced</span></label>
        </fieldset>
        <div class="advanced-options-wrapper">
          <fieldset class="u-mb-sm u-position-relative ticket-only" id="ticket-status"></fieldset>
          <fieldset class="u-mb-sm">
            <label class="c-txt__label" for="range">Date Range</label>
            <select name="range" id="range" class="c-txt__input c-txt__input--select u-mb-sm">
              <option value="">-</option>
              <option value="created">${I18n.t('search.filter.created')}</option>
              <option value="updated">${I18n.t('search.filter.updated')}</option>
            </select>
            <div class="row">
              <div class="col">
                <label class="c-txt__label" for="from">Start</label>
                <input type="text" id="from" class="c-txt__input" placeholder="YYYY-MM-DD">
              </div>
              <div class="col">
                <label class="c-txt__label" for="to">End</label>
                <input type="text" id="to" class="c-txt__input" placeholder="YYYY-MM-DD">
              </div>
            </div>
          </fieldset>
          <fieldset class="u-mb-sm ticket-only">
            <label class="c-txt__label" for="assignee">${I18n.t('search.user.assignee')}</label>
            <span id="assignee" class="placeholder"></span>
          </fieldset>
          <fieldset class="u-mb-sm">
            ${getBrandsDropdownTemplate(args)}
          </fieldset>
        </div>
      </form>
    </div>
    <div class="results-wrapper"></div>
  </div>
  `
  )
}
