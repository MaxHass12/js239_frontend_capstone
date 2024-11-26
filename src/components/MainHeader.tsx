import hamburger from '../images/hamburger.png';

export default function MainHeader() {
  return (
    <header>
      <label htmlFor="sidebar_toggle">
        <img src={hamburger} alt="Toggle Sidebar"></img>
      </label>
      <dl>
        <dt>
          <time>All Todos</time>
        </dt>
        <dd>0</dd>
      </dl>
    </header>
  );
}
