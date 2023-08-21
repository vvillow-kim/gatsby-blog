import * as React from "react";
import { Link } from "gatsby";
import { styled, css } from "styled-components";

const MENU_ITEMS = [
  { path: "/posts", title: "Posts" },
  { path: "/series", title: "Series" },
  { path: "/tags", title: "Tags" },
  { path: "/about", title: "About" },
];

type HeaderProps = {
  emphasize?: boolean;
  title: string;
};

function Header({ emphasize, title }: HeaderProps) {
  const menuItems = !emphasize ? MENU_ITEMS : MENU_ITEMS.slice(3);
  return (
    <Container emphasize={emphasize}>
      <HeaderContainer emphasize={emphasize}>
        <header>
          <Link to="/">{title}</Link>
        </header>
      </HeaderContainer>
      <Menu shrink={emphasize}>
        <ul>
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </Menu>
    </Container>
  );
}

type ContainerProps = {
  emphasize?: boolean;
};
const Container = styled.div<ContainerProps>`
  margin: 0 16px;
  margin-bottom: 64px;
  padding: 16px 0;
  box-shadow: inset 0 -1px 0 #e0e0e0;

  ${(p) =>
    p.emphasize &&
    css`
      @media (max-width: 500px) {
        flex-direction: column;
      }
    `}
`;

type HeaderContainerProps = {
  emphasize?: boolean;
};
const HeaderContainer = styled.div<HeaderContainerProps>`
  display: flex;
  flex-direction: row;
  font-family: monospace;
  margin: 16px 0;

  & > header {
    margin-right: 8px;
    font-weight: 600;
    font-size: 2rem;
    > a {
      color: #242424;
    }
  }

  & > address {
    font-size: 0.875rem;
    font-style: normal;
    > a {
      color: #242424;
    }
  }

  @media (max-width: 799px) {
    flex-direction: column;
  }

  ${(p) =>
    p.emphasize &&
    css`
      padding-top: 56px;
      padding-bottom: 48px;

      & > header {
        font-size: 5rem;
      }
      & > address {
        font-size: 1.5rem;
      }

      @media (max-width: 799px) {
        flex-direction: column;

        & > header {
          font-size: 4.5rem;
        }
        & > address {
          font-size: 1.25rem;
        }
      }
      @media (max-width: 500px) {
        order: 2;
      }
    `}
`;

type MenuProps = {
  shrink?: boolean;
};
const Menu = styled.nav<MenuProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  > ul {
    display: flex;
    flex-direction: row;
    gap: 15px;

    margin: 0;
    padding: 0;
    list-style: none;

    > li > a {
      display: inline-block;
      color: #242424;
      text-decoration: underline;
      font-size: 1rem;
    }
  }

  ${(p) =>
    p.shrink &&
    css`
      @media (max-width: 500px) {
        order: 1;
      }
    `}
`;

export default Header;
