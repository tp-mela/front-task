import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';
import Button from './Button';



export default function Header() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  return (
    <header className="header">
      <Link to="/" className="header__logo">Users & Cars</Link>

      <nav className="header__nav">
        <Link to="/users"
          className={`header__link ${pathname.startsWith('/users') ? 'header__link--active' : ''}`}>
          Users
        </Link>
        <Link to="/cars"
          className={`header__link ${pathname.startsWith('/cars')  ? 'header__link--active' : ''}`}>
          Cars
        </Link>

        {user ? (
          <>
            <span>{user.name}</span>
            <Button variant="secondary" onClick={() => dispatch(logout())}>Logout</Button>
          </>
        ) : (
          <Button variant="secondary" as={Link} to="/login">Login</Button>
        )}
      </nav>
    </header>
  );
}
