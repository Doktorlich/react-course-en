export default function Loader({nameLoader}) {
    return (
        <>
            <div className="selected-project flex items-center">
                {nameLoader || "Loading project"}
                <span className="flex space-x-1 ml-1">
                    <span
                        className="h-1 w-1 bg-current rounded-full animate-[opacityToggle_1.5s_infinite]"
                        style={{ animationDelay: "0.0s" }}
                    />
                    <span
                        className="h-1 w-1 bg-current rounded-full animate-[opacityToggle_1.5s_infinite]"
                        style={{ animationDelay: "0.5s" }}
                    />
                    <span
                        className="h-1 w-1 bg-current rounded-full animate-[opacityToggle_1.5s_infinite]"
                        style={{ animationDelay: "1.0s" }}
                    />
                </span>
            </div>
        </>
    );
}
