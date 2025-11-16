// File: app/components/Header.tsx
'use client'; // WAJIB untuk 'usePathname'
"use strict";
exports.__esModule = true;
exports.Header = void 0;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
exports.Header = function () {
    var pathname = navigation_1.usePathname();
    var _a = react_1.useState(false), isScrolled = _a[0], setIsScrolled = _a[1];
    // Cek apakah ini halaman Beranda
    var isHomepage = pathname === '/';
    // Efek untuk mendeteksi scroll
    react_1.useEffect(function () {
        var handleScroll = function () {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, []);
    // Tentukan kelas CSS untuk header
    // - Transparan di Beranda & belum di-scroll
    // - Solid (gelap) jika di-scroll atau jika bukan di Beranda
    var headerClass = isHomepage && !isScrolled
        ? 'bg-transparent text-white' // Transparan
        : 'bg-brand-dark text-white shadow-md'; // Solid
    return (React.createElement("header", { className: "sticky top-0 z-50 p-4 transition-colors duration-300 " + headerClass },
        React.createElement("div", { className: "container mx-auto flex justify-between items-center" },
            React.createElement(link_1["default"], { href: "/", className: "text-2xl font-bold" }, "SMA Pasundan Majalaya"),
            React.createElement("nav", { className: "hidden md:flex gap-6 items-center" },
                React.createElement(link_1["default"], { href: "/", className: "hover:text-gray-300" }, "Beranda"),
                React.createElement(link_1["default"], { href: "/profil", className: "hover:text-gray-300" }, "Profil Sekolah"),
                React.createElement(link_1["default"], { href: "/prestasi", className: "hover:text-gray-300" }, "Prestasi"),
                React.createElement(link_1["default"], { href: "/fasilitas", className: "hover:text-gray-300" }, "Fasilitas"),
                React.createElement(link_1["default"], { href: "/galeri", className: "hover:text-gray-300" }, "Galeri"),
                React.createElement(link_1["default"], { href: "/kontak", className: "hover:text-gray-300" }, "Kontak"),
                React.createElement(link_1["default"], { href: "/login", className: "bg-brand-green text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors" }, "Login")))));
};
