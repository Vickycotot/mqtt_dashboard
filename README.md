# IoT Dashboard

A modern, responsive web dashboard for monitoring and controlling IoT devices using MQTT protocol. Built with HTML, JavaScript, and styled with Tailwind CSS.

## Features

- Real-time temperature and humidity monitoring
- Control multiple LED lights independently
- Responsive design that works on desktop and mobile devices
- MQTT integration for real-time communication
- Visual status indicators with color-coded feedback
- Connection status alerts

## Technologies Used

- HTML5
- JavaScript (ES6+)
- Tailwind CSS for styling
- MQTT.js for real-time communication
- Font Awesome for icons
- HiveMQ as MQTT broker

## MQTT Topics

The dashboard uses the following MQTT topics:
- `Your_topic/led{1,2,3}` - For controlling individual LED lights
- `ficilabs/temp` - For temperature readings
- `ficilabs/hum` - For humidity readings

## Setup and Installation

1. Clone this repository to your local machine
2. Make sure all files are in the same directory:
   - `index.html`
   - `style.css`
   - `script.js`

3. No additional installation is needed as the project uses CDN links for:
   - Tailwind CSS
   - MQTT.js
   - Font Awesome
   - Google Fonts (Roboto)

## Usage

1. Open `index.html` in a web browser
2. The dashboard will automatically connect to the HiveMQ broker
3. Use the toggle switches to control the LED lights
4. Temperature and humidity values will update automatically when received via MQTT

## Features Breakdown

### LED Control
- Three independent LED controls
- Visual feedback with icon color change
- Toggle switch animation
- Status indicators (ON/OFF)

### Temperature Display
- Real-time temperature updates
- Color-coded indicators:
  - Blue: < 15°C
  - Yellow: 15-25°C
  - Red: > 25°C

### Humidity Display
- Real-time humidity updates
- Color-coded indicators:
  - Blue: < 30%
  - Green: 30-60%
  - Red: > 60%

### Connection Status
- Real-time connection status alerts
- Visual feedback for:
  - Connected (Green)
  - Disconnected (Yellow)
  - Error (Red)
  - Connecting (Blue)

## MQTT Configuration

```javascript
const broker = 'ws://broker.hivemq.com:8000/mqtt';
const clientId = 'ledcontrol_' + Math.random().toString(16).substr(2, 8);
const topicPrefix = 'Your_topic/';
```

## Browser Compatibility

The dashboard is compatible with modern web browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Contributing

Feel free to submit issues and enhancement requests.

## License

© 2025 Fici Labs. All rights reserved.

## Note

This dashboard uses the public HiveMQ broker for demonstration purposes. For production use, it's recommended to use a private MQTT broker for security and reliability.
