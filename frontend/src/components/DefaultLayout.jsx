import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <div id="defaultLayout">
            <header>
                <div>Header</div>
            </header>
            <nav>
                <div>Navbar</div>
                {/* Tambahkan menu atau link navigasi di sini */}
            </nav>
            <div>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
