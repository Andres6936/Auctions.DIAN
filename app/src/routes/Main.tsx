import Dock from "@/components/dock";
import {Home, Archive, User, Settings} from "lucide-react";

export function Main() {
    const items = [
        {icon: <Home size={18} className="color:white"/>, label: 'Home', onClick: () => alert('Home!')},
        {icon: <Archive size={18} className="color:white"/>, label: 'Archive', onClick: () => alert('Archive!')},
        {icon: <User size={18} className="color:white"/>, label: 'Profile', onClick: () => alert('Profile!')},
        {icon: <Settings size={18} className="color:white"/>, label: 'Settings', onClick: () => alert('Settings!')},
    ];

    return (
        <section className="flex flex:1 flex:col h:100vh max-h:100vh w:100vw max-w:100vw bg:slate-95 font:sans">
            <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
            />
        </section>
    )
}