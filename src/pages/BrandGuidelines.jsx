import React from "react";
import { MoveRight, Download, Palette, Type, ShieldCheck } from "lucide-react";

const BrandGuidelines = () => {
    return (
        <div className="min-h-screen bg-base-200 font-sans text-base-content">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-base-200 text-base-content py-24">
                <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-5"></div>
                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/60 text-xs font-semibold tracking-wider mb-6">
                        DESIGN SYSTEM v1.0
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Brand Guidelines
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-light leading-relaxed">
                        The comprehensive guide to maintaining the integrity and consistency
                        of the Virendra brand identity across all platforms.
                    </p>
                </div>
            </section>


            {/* Logo Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-white rounded-xl shadow-sm">
                            <img src="/Virendra_Logo.png" alt="Icon" className="w-8 h-8 object-contain" />
                        </div>
                        <h2 className="text-4xl font-bold">Our Logo</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Logo Showcase */}
                        <div className="bg-white rounded-3xl p-12 flex items-center justify-center border border-base-300 shadow-sm min-h-[400px]">
                            <img
                                src="/Virendra_Logo.png"
                                alt="Virendra Logo"
                                className="max-w-full max-h-[200px] object-contain drop-shadow-xl"
                            />
                        </div>

                        {/* Logo Rules */}
                        <div className="flex flex-col justify-center space-y-8">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Primary Usage</h3>
                                <p className="text-base-content/70">
                                    The full-color logo should be used on white or light backgrounds.
                                    Ensure adequate clear space around the logo to maintain legibility.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-base-100 rounded-xl border border-base-300">
                                    <h4 className="font-bold mb-2 text-sm uppercase tracking-wide text-error">Don't</h4>
                                    <p className="text-sm opacity-70">Do not stretch, rotate, or alter colors.</p>
                                </div>
                                <div className="p-6 bg-base-100 rounded-xl border border-base-300">
                                    <h4 className="font-bold mb-2 text-sm uppercase tracking-wide text-success">Do</h4>
                                    <p className="text-sm opacity-70">Use high-resolution files for print.</p>
                                </div>
                            </div>
                            <button className="btn btn-outline gap-2 self-start">
                                <Download className="w-4 h-4" />
                                Download Brand Assets
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Typography Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-12">
                    <Type className="w-8 h-8 text-primary" />
                    <h2 className="text-4xl font-bold">Typography</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <div className="bg-base-200 rounded-2xl p-10 border border-base-300 mb-6">
                            <span className="text-9xl font-black opacity-10 block mb-4">Aa</span>
                            <h3 className="text-4xl font-bold mb-2">Inter</h3>
                            <p className="text-xl opacity-70">The primary typeface.</p>
                        </div>
                        <p className="text-base-content/70 leading-relaxed">
                            We use <strong>Inter</strong> for its clean, modern aesthetic and high readability across all digital and print mediums. It conveys a sense of scientific precision and approachability.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="border-b border-base-300 pb-6">
                            <p className="text-sm opacity-50 mb-2">Heading 1 / Bold / 48px</p>
                            <h1 className="text-5xl font-bold">Scientific Excellence</h1>
                        </div>
                        <div className="border-b border-base-300 pb-6">
                            <p className="text-sm opacity-50 mb-2">Heading 2 / Semibold / 32px</p>
                            <h2 className="text-3xl font-semibold">Chemical Innovation</h2>
                        </div>
                        <div className="border-b border-base-300 pb-6">
                            <p className="text-sm opacity-50 mb-2">Body / Regular / 16px</p>
                            <p className="text-base">
                                We are dedicated to providing the highest quality chemical solutions
                                to our partners. Our commitment to excellence drives everything we do.
                            </p>
                        </div>
                    </div>
                </div>
                </div>
            </section>

            {/* Colors Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-12">
                        <Palette className="w-8 h-8 text-primary" />
                        <h2 className="text-4xl font-bold">Color Palette</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                        {/* Primary Color */}
                        <div className="group space-y-3">
                            <div className="h-40 w-full rounded-2xl bg-[#1a9b84] shadow-lg group-hover:scale-[1.02] transition-transform"></div>
                            <div>
                                <h4 className="font-bold text-lg">Virendra Teal</h4>
                                <p className="text-xs uppercase opacity-60">Primary</p>
                                <p className="font-mono text-sm opacity-80 select-all">#1a9b84</p>
                            </div>
                        </div>

                        {/* Secondary Color */}
                        <div className="group space-y-3">
                            <div className="h-40 w-full rounded-2xl bg-[#63b63c] shadow-lg group-hover:scale-[1.02] transition-transform"></div>
                            <div>
                                <h4 className="font-bold text-lg">Leaf Green</h4>
                                <p className="text-xs uppercase opacity-60">Secondary</p>
                                <p className="font-mono text-sm opacity-80 select-all">#63b63c</p>
                            </div>
                        </div>

                        {/* Accent */}
                        <div className="group space-y-3">
                            <div className="h-40 w-full rounded-2xl bg-[#d7e84b] border border-base-300 shadow-lg group-hover:scale-[1.02] transition-transform"></div>
                            <div>
                                <h4 className="font-bold text-lg">Citrus Lime</h4>
                                <p className="text-xs uppercase opacity-60">Accent</p>
                                <p className="font-mono text-sm opacity-80 select-all">#d7e84b</p>
                            </div>
                        </div>

                        {/* Neutral */}
                        <div className="group space-y-3">
                            <div className="h-40 w-full rounded-2xl bg-[#1f2b23] shadow-lg group-hover:scale-[1.02] transition-transform"></div>
                            <div>
                                <h4 className="font-bold text-lg">Deep Forest</h4>
                                <p className="text-xs uppercase opacity-60">Text / Neutral</p>
                                <p className="font-mono text-sm opacity-80 select-all">#1f2b23</p>
                            </div>
                        </div>

                        {/* Background */}
                        <div className="group space-y-3">
                            <div className="h-40 w-full rounded-2xl bg-[#f7faf2] border border-base-300 shadow-lg group-hover:scale-[1.02] transition-transform"></div>
                            <div>
                                <h4 className="font-bold text-lg">Mist White</h4>
                                <p className="text-xs uppercase opacity-60">Background</p>
                                <p className="font-mono text-sm opacity-80 select-all">#f7faf2</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-white rounded-2xl border border-base-300">
                        <h3 className="text-lg font-bold mb-4">Color Usage Balance</h3>
                        <div className="h-4 w-full rounded-full overflow-hidden flex">
                            <div className="h-full bg-[#f7faf2] w-[50%]"></div>
                            <div className="h-full bg-[#1a9b84] w-[25%]"></div>
                            <div className="h-full bg-[#63b63c] w-[15%]"></div>
                            <div className="h-full bg-[#d7e84b] w-[10%]"></div>
                        </div>
                        <div className="mt-2 text-xs opacity-60 flex">
                            <span className="w-[50%]">50% Mist White</span>
                            <span className="w-[25%] text-center">25% Primary</span>
                            <span className="w-[15%] text-center">15% Secondary</span>
                            <span className="w-[10%] text-right">10% Accent</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default BrandGuidelines;
