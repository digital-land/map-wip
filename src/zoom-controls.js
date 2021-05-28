function ZoomControls ($module, leafletMap, initialZoom) {
  this.$module = $module
  this.map = leafletMap
  this.initialZoom = initialZoom
}

ZoomControls.prototype.init = function (params) {
  this.setupOptions(params)

  if (!this.$module) {
    return undefined
  }
  this.$module.classList.remove('js-hidden')

  const $buttons = this.$module.querySelectorAll(this.buttonSelector)
  this.$buttons = Array.prototype.slice.call($buttons)

  this.$counter = this.$module.querySelector(this.counterSelector)
  this.$counter.textContent = this.initialZoom

  const boundClickHandler = this.clickHandler.bind(this)
  this.$buttons.forEach(function ($button) {
    $button.addEventListener('click', boundClickHandler)
  })

  const boundZoomHandler = this.zoomHandler.bind(this)
  this.map.addEventListener('zoomend', boundZoomHandler)

  // get rid of default zoom controls
  this.map.removeControl(this.map.zoomControl)

  return this
}

ZoomControls.prototype.clickHandler = function (e) {
  e.preventDefault()
  const $clickedControl = e.target
  this.zoom($clickedControl.dataset.zoomControl)
  console.log("clicked", $clickedControl)
}

ZoomControls.prototype.zoom = function (direction) {
  (direction === 'in') ? this.map.zoomIn(1) : this.map.zoomOut(1)
}

ZoomControls.prototype.zoomHandler = function (e) {
  const zoomLevel = this.map.getZoom()
  this.$counter.textContent = zoomLevel
}

ZoomControls.prototype.setupOptions = function (params) {
  params = params || {}
  this.buttonSelector = params.buttonSelector || '.zoom-controls__btn'
  this.counterSelector = params.counterSelector || '.zoom-controls__count'
}
