'use client';

import Link from "next/link";


export default function Footer() {
    return (
        <div className="navbar flex items-center justify-center bg-white px-6 py-4 border-b border-gray-200 scroll-smooth">
            <ul className="menu flex space-x-6">
                <li className="text-gray-700 hover:text-black">
                    <Link href="/Impressum">Impressum</Link>
                </li>
                <li className="text-gray-700 hover:text-black">
                    <Link href="/FaQ">FAQ</Link>
                </li>
                <li className="text-gray-700 hover:text-black">About us</li>

            </ul>

        </div>

    );
}