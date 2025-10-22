
export default function Footer() {

    return (
        <div className="flex flex-col items-center z-0 w-[100%] sm:w-[100vw] bg-black text-white p-5 sm:p-15">
            <div className="flex flex-col sm:flex-row justify-center gap-20 w-[100%] sm:w-[200px] md:w-[600px] lg:w-[900px]">
                <ul className="list-none w-[100%] sm:w-[33.33%]">
                    <h1>MAY WE HELP YOU?</h1>
                    <li>Contact Us</li>
                    <li>My Order</li>
                    <li>FAQs</li>
                    <li>Email Unsubscribe</li>
                    <li>Sitemap</li>
                </ul>
                <ul className="list-none w-[100%] sm:w-[33.33%]">
                    <h1>THE COMPANY</h1>
                    <li>About Gucci</li>
                    <li>Gucci Equilibrium</li>
                    <li>Code of Ethics</li>
                    <li>Career</li>
                    <li>Legal</li>
                    <li>Pricacy Policy</li>
                    <li>Cookie Policy</li>
                    <li>Cookie Setting</li>
                    <li>Corporate Information</li>
                    <li>Vulnerability Disclosure Policy</li>
                </ul>
                <div className="flex flex-col gap-7 w-[100%] sm:w-[33.33%]">
                    {/* <h1>STORE LOCATOR</h1>
                    <div className="flex">
                        <input type="text" placeholder="Country/Region, City" className="w-[100%] border-white border-b-1 !focus:border-black outline-none" />
                        <span className="border-white border-b-1">{">"}</span>
                    </div> */}
                    <h1>SIGN UP FOR GUCCI UPDATES</h1>
                    <p className="text-justify">By entering your email address below, you consent to receiving our newsletter with access to our latest collections, events and initiatives. </p>
                    {/* <div className="flex">
                        <input type="text" placeholder="Email" className="w-[100%] border-white border-b-1 !focus:border-black outline-none" />
                        <span className="border-white border-b-1">{">"}</span>
                    </div> */}
                    <h1>COUNTRY/REGION</h1>
                    <p>United States</p>
                </div>
            </div>
            <div className="mt-9">© 2016 - 2025 Guccio Gucci S.p.A. - All rights reserved. SIAE LICENCE # 2294/I/1936 and 5647/I/1936</div>
            <h1 className="text-[500%] sm:text-[800%] md:text-[1000%] lg:text-[1900%]" style={{ letterSpacing: '50%', fontFamily: "'Cormorant Garamond', serif" }}>
                GUCCI
            </h1>
        </div>
    )
}