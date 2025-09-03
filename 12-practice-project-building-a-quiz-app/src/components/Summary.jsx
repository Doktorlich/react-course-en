import quizComplete from "../assets/quiz-complete.png";
import QUESTION from "../questions.js";

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTION[index].answers[0]);

    const skippedAnswerShare = (skippedAnswers.length / userAnswers.length) * 100;
    const correctAnswerShare = (correctAnswers.length / userAnswers.length) * 100;

    const wrongAnswersShare = 100 - skippedAnswerShare - correctAnswerShare;

    return (
        <div id={"summary"}>
            <img src={quizComplete} alt="Quiz complete" />
            <h2>Quiz Completed</h2>
            <div id={"summary-stats"}>
                <p>
                    <span className={"number"}>{skippedAnswerShare.toFixed()}%</span>
                    <span className={"text"}>skipped</span>
                </p>
                <p>
                    <span className={"number"}>{correctAnswerShare.toFixed()}%</span>
                    <span className={"text"}>answered correctly</span>
                </p>
                <p>
                    <span className={"number"}>{wrongAnswersShare.toFixed()}%</span>
                    <span className={"text"}>answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = "user-answer";
                    if (answer === null) {
                        cssClass = " skipped";
                    } else if (answer === QUESTION[index].answers[0]) {
                        cssClass += " correct";
                    } else {
                        cssClass += " wrong";
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className={"question"}>{QUESTION[index].text}</p>
                            <p className={cssClass}>{answer ?? "Skipped"}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
