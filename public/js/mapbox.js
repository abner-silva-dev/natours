export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWJuZXItZGV2IiwiYSI6ImNsZDNudmo3cDAzcnQzcHBjYTdvcjZkYWEifQ.-mHsAuY7iZdt3W7WqBkCRQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/abner-dev/cld3va24d000e01rrlbuu5871',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  const createPopup = options => {
    new mapboxgl.Popup({
      offset: 30,
      closeOnClick: false
    })
      .setLngLat(options.coordinates)
      .setHTML(
        `<p class='popup-${options.day}'>Day ${options.day} ${
          options.description
        }</p>`
      )
      .addTo(map);
  };

  locations.forEach(location => {
    // Create marker
    const element = document.createElement('div');
    element.classList.add('marker');

    element.addEventListener('click', function() {
      if (document.querySelector(`.popup-${location.day}`)) return;
      createPopup(location);
    });

    // Add marker to map
    new mapboxgl.Marker({ element, anchor: 'bottom' })
      .setLngLat(location.coordinates)
      .addTo(map);

    // Add popup to map
    createPopup(location);

    // Extends map bounds to include current location
    bounds.extend(location.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100
    }
  });
};
