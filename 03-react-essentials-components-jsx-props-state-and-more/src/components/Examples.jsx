import TabButton from "./TabButton";
import { EXAMPLES } from "../data";
import { useState } from "react";
import Section from "./Section";
import Tabs from "./Tabs";

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState();
    function handleSelect(selectedButton) {
        setSelectedTopic(selectedButton);
        console.log(selectedButton);
    }
    return (
        <Section title="Examples" id="examples">
            <Tabs
                buttons={
                    <>
                        <TabButton
                            isSelected={selectedTopic === "components"}
                            onClick={() => handleSelect("components")}
                        >
                            Components
                        </TabButton>
                        <TabButton isSelected={selectedTopic === "jsx"} onClick={() => handleSelect("jsx")}>
                            JSX
                        </TabButton>
                        <TabButton isSelected={selectedTopic === "props"} onClick={() => handleSelect("props")}>
                            Props
                        </TabButton>
                        <TabButton isSelected={selectedTopic === "state"} onClick={() => handleSelect("state")}>
                            State
                        </TabButton>
                    </>
                }
            ></Tabs>
            <div id="tab-content">
                {selectedTopic === undefined ? (
                    <h3>Please select a topic.</h3>
                ) : (
                    <>
                        <h3>{EXAMPLES[selectedTopic]?.title}</h3>
                        <p>{EXAMPLES[selectedTopic]?.description}</p>
                        <pre>
                            <code>{EXAMPLES[selectedTopic]?.code}</code>
                        </pre>
                    </>
                )}
            </div>
        </Section>
    );
}
