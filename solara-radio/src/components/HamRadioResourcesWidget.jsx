import solara
from solara.components import Icon
from solara.website.utils import set_title

link_data = {
    "General": [
        ("QRZ.com", "https://www.qrz.com"),
        ("FCC ULS", "https://wireless2.fcc.gov/UlsApp/UlsSearch/searchLicense.jsp"),
        ("PSKReporter", "https://pskreporter.info/pskmap.html"),
        ("DXMaps", "https://www.dxmaps.com/"),
        ("SolarHam", "https://www.solarham.net/"),
        ("ARRL", "https://www.arrl.org/"),
        ("eHam.net", "https://www.eham.net/"),
        ("Logbook of the World", "https://lotw.arrl.org/lotwuser/default"),
        ("HamQTH", "https://www.hamqth.com/"),
        ("K0BG Mobile HF", "https://www.k0bg.com/"),
    ],
    "Satellites": [
        ("AMSAT", "https://www.amsat.org"),
        ("SatNOGS", "https://network.satnogs.org/"),
        ("Heavens-Above", "https://www.heavens-above.com"),
        ("N2YO", "https://www.n2yo.com/"),
        ("Gpredict", "https://sourceforge.net/projects/gpredict/"),
        ("ARISS", "https://www.ariss.org/"),
        ("SatPC32", "http://www.dk1tb.de/indexeng.htm"),
        ("AMSAT Status", "https://www.amsat.org/status/"),
        ("FUNCube Dashboard", "https://funcube.org.uk/working-documents/funcube-telemetry-dashboard/"),
        ("Oscar List", "https://www.n2yo.com/satellites/?c=18"),
    ],
    "Emergency Comms": [
        ("ARRL ARES", "https://www.arrl.org/ares"),
        ("FEMA ICS Training", "https://training.fema.gov/is/courseoverview.aspx?code=IS-100.c"),
        ("Skywarn", "https://www.weather.gov/SKYWARN"),
        ("SEEN Net", "https://seen-net.com"),
        ("SATERN", "https://salvationarmyradio.org/"),
        ("ARES Connect", "https://arrl.volunteerhub.com/"),
        ("Winlink", "https://winlink.org/"),
        ("RACES", "https://www.usraces.org/"),
        ("VOAD", "https://www.nvoad.org/"),
        ("ARRL EmComm Training", "https://www.arrl.org/emergency-communications-training"),
    ],
    "Digital Modes": [
        ("WSJT-X", "https://physics.princeton.edu/pulsar/k1jt/wsjtx.html"),
        ("JS8Call", "https://js8call.com/"),
        ("FLDigi", "http://www.w1hkj.com/"),
        ("Ham Radio Deluxe", "https://www.hamradiodeluxe.com/"),
        ("VARA Modem", "https://rosmodem.wordpress.com/"),
        ("NBEMS Guide", "https://www.arrl.org/files/file/Get%20on%20the%20Air/NBEMS.pdf"),
        ("ARRL Digital Overview", "https://www.arrl.org/digital-modes"),
        ("FT8 Guide", "https://www.g4ifb.com/FT8_Hinson_tips_for_HF_DXers.pdf"),
        ("DM780", "https://www.hamradiodeluxe.com/features/digital-modes.html"),
        ("WSJT-X Frequencies", "https://www.dxzone.com/wsjt-x-frequency-list/"),
    ],
    "Packet Radio": [
        ("Dire Wolf", "https://github.com/wb2osz/direwolf"),
        ("APRS.fi", "https://aprs.fi"),
        ("PinPoint APRS", "http://www.pinpointaprs.com/"),
        ("AGWPE", "http://www.sv2agw.com/ham/agwpe.htm"),
        ("YAAC", "https://www.ka2ddo.org/ka2ddo/YAAC.html"),
        ("UI-View", "http://www.ui-view.net/"),
        ("AX.25 Protocol", "https://tldp.org/HOWTO/AX25-HOWTO/index.html"),
        ("Winlink Book", "https://winlink.org/book"),
        ("Byonics", "http://www.byonics.com/"),
        ("TAPR", "https://www.tapr.org/"),
    ],
    "Supplies": [
        ("DX Engineering", "https://www.dxengineering.com/"),
        ("Ham Radio Outlet", "https://www.hamradio.com/"),
        ("GigaParts", "https://www.gigaparts.com/"),
        ("R&L Electronics", "https://www.randl.com/"),
        ("Universal Radio", "https://www.universal-radio.com/"),
        ("Mouser", "https://www.mouser.com/"),
        ("Allied Electronics", "https://www.alliedelec.com/"),
        ("Arrow Antennas", "https://www.arrowantennas.com/"),
        ("Powerwerx", "https://powerwerx.com/"),
        ("MFJ Enterprises", "https://www.mfjenterprises.com/"),
    ],
    "Antennas": [
        ("Antenna Theory", "https://www.antenna-theory.com/"),
        ("M0UKD Projects", "https://www.m0ukd.com/"),
        ("K7MEM Calculators", "http://www.k7mem.com/"),
        ("ARRL Antenna Book", "https://www.arrl.org/shop/ARRL-Antenna-Book-for-Radio-Communications-24th-Softcover-Edition/"),
        ("NEC2/4nec2", "https://www.qsl.net/4nec2/"),
        ("DX Engineering Articles", "https://www.dxengineering.com/techarticles"),
        ("Hamuniverse Antennas", "https://www.hamuniverse.com/antennas.html"),
        ("VE3SQB Designs", "http://www.ve3sqb.com/"),
        ("W8JI Antenna Theory", "https://www.w8ji.com/"),
        ("VK1NAM Portable", "https://vk1nam.wordpress.com/"),
    ],
}

@solara.component
def HamRadioResourcesWidget():
    set_title("Ham Radio Resource Dashboard")

    open_modal = solara.reactive(False)
    selected_category = solara.reactive("")

    def show_links(category):
        selected_category.set(category)
        open_modal.set(True)

    with solara.Column(gap="1em"):
        solara.Markdown("## 📡 Ham Radio Resource Categories")

        with solara.GridResponsive(columns=3):
            for category in link_data.keys():
                with solara.Card(clickable=True, on_click=lambda c=category: show_links(c)):
                    solara.Text(f"📁 {category}", style="font-weight: bold; font-size: 1.2em")

        if open_modal.value:
            with solara.Dialog(title=f"{selected_category.value} Links", open=open_modal):
                for name, url in link_data[selected_category.value]:
                    solara.Markdown(f"- [{name}]({url})")


