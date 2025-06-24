export default function TabButton({children, isSelected,...props}) {
  function handleClick() {
    console.log("Hello world!");
  }
  // or
  // function clickHandler() {
  // }
  return (
    <li>
      <button className={isSelected?"active":null} {...props}>{children}</button>
    </li>
  );
}
