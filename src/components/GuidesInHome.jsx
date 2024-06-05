import GuideCard from "./GuideCard";
import useGuides from "../hooks/useGuides";

const GuidesInHome = () => {
    const { isPending, data } = useGuides();

    if (isPending) {
        return (
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <div className="skeleton h-24"></div>
                <div className="skeleton h-24"></div>
                <div className="skeleton h-24"></div>
                <div className="skeleton h-24"></div>
            </div>
        )
    }

    return (
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            { 
                data.map(guide => <GuideCard key={guide._id} guide={guide}></GuideCard>)
            }
        </div>
    );
};

export default GuidesInHome;