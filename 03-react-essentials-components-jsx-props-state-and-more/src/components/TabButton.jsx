export default function TabButton({children,onSelect, isSelected}) {
  function handleClick() {
    console.log("Hello world!");
  }
  // or
  // function clickHandler() {
  // }
  return (
    <li>
      <button className={isSelected?"active":null} onClick={onSelect}>{children}</button>
    </li>
  );
}
