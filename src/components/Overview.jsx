const Overview = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
            <div className="my-auto relative">
                <div className="w-full h-full absolute bg-black bg-opacity-30 rounded-lg"></div>
                <img src="https://i.ibb.co/pRLhPKb/mountain.jpg" alt="" className="w-full rounded-lg"/>
            </div>
            <div className="my-auto">
                <p className="text-justify"><span className="font-bold">Welcome</span> to <span className="font-bold">Compass</span> travels! Discover why we are the preferred choice for travelers. Explore our offerings and start your journey today!</p>
                <ul className="list-disc pl-8 mt-4">
                    <li><span className="font-bold">Professionalism: </span>We ensure top-notch service with a focus on customer satisfaction and seamless travel experiences.</li>
                    <li><span className="font-bold">Well-Trained Guides: </span>Our experienced and knowledgeable guides enhance your journey with insightful and engaging tours.</li>
                    <li><span className="font-bold">Tailored Packages: </span>We offer customized travel packages to suit your preferences and make your adventure unforgettable.</li>
                </ul>
            </div>
        </div>
    );
};

export default Overview;