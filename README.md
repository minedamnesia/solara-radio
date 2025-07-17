# Solara Radio ☀️📡

**Live amateur radio dashboard powered by solar data, space weather, and your location.**

Solara Radio is a web-based ham radio utility that combines real-time propagation data, satellite tracking, Spotify-powered QSO soundtracks, and other tools into a modular React dashboard. It’s designed for operators who want a stylish, responsive, and location-aware interface while chasing DX, activating POTA, or planning QSOs under changing band conditions.

🌐 **Live Site**: [https://solararadio.netlify.app/](https://solararadio.netlify.app/)

---

## 🔧 Features

- **📶 HF Propagation Dashboard**  
  Live G/S/R indices, SFI, Kp, Ap values with band condition highlights (color-coded by band quality).

- **🧭 Compass & Maidenhead Locator**  
  Device orientation compass and automatic Maidenhead grid square based on geolocation.

- **📡 Satellite Pass Tracker**  
  View upcoming passes from N2YO API using real-time location data (VITE_N2YO_API_KEY required).

- **📃 ADIF Logbook Display**  
  Parses uploaded `.adi` files and visualizes contact info (callsign, flag, mode, time, etc.).

- **🎶 Spotify Playlist Picker**  
  Dropdown selector of pre-curated playlists for portable ops or digital-mode chill zones.

- **☀️ VOACAP AI Propagation Predictor** *(In Progress)*  
  Upcoming support for AI-enhanced HF propagation prediction based on frequency, environment, antenna height, and distance.

---

## 🗂️ Folder Structure

# solara-radio

---

## 🔐 Environment Variables

To enable satellite tracking and other geolocation-dependent features, you'll need a `.env` file in the root directory with the following:

```env
VITE_N2YO_API_KEY=your_api_key_here
```
You can get your free API key from N2YO.com.
## 🧪 Development
```bash
git clone https://github.com/minedamnesia/solara-radio.git
cd solara-radio/solara-radio
npm install
npm run dev
```
This will start the Vite dev server and open the app in your browser.

## 🛠️ Built With
- React + Vite – modern JS framework with blazing-fast development

- Tailwind CSS – utility-first styling for a clean layout

- Netlify – for seamless continuous deployment of the frontend

- Render - for backend deployment

- Open APIs – NOAA, N2YO, VOACAP, Spotify, QRZ (planned)

## Who Is This For?
Solara Radio is made for:

- Amateur radio operators (especially POTA/SOTA/portable ops)

- Radio propagation nerds

- DX chasers and contesters

- Ham-curious techies

- Weather space geeks and solar cycle watchers

- People who like charts, widgets, and pretty dashboards

- Me (so I can find the things I need easily)

## 👩‍💻 Author
Created by Kelly Simer — Python developer, ham radio operator (Extra class) -- call sign KK7QEA, and cosmic dashboard tinkerer.

## 📜 License
MIT License. See LICENSE for more info.
