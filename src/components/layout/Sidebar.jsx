import {
  Task,
  ArrowLeftLine,
  ArrowRightLine,
  Gear,
  Setting,
} from "@rsuite/icons";
import React, { useState } from "react";
import color from "../../styles/colors";
import CheckIcon from "@rsuite/icons/Check";
import { Nav, Navbar, Sidebar, Sidenav, Toggle } from "rsuite";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavToggle = ({ expand, onExpandStateChange }) => {
  return (
    <Navbar
      appearance="subtle"
      style={{
        position: "fixed",
        bottom: 0,
        zIndex: 9999,
        width: "inherit",
        backgroundColor: "var(--rs-bg-well)",
      }}
    >
      {/* <Nav>
                <Nav.Menu
                    placement="topStart"
                    trigger="click"
                    renderTitle={children => {
                        return <div style={{
                            width: 56,
                            height: 56,
                            padding: 18,
                            lineHeight: '56px',
                            textAlign: 'center'
                        }} />;
                    }}
                >
                    {color.map((item, index) => (
                        <Nav.Item key={index}><Avatar circle size="sm" style={{ background: item.color }}><CheckIcon style={{ fontSize: 14 }} /></Avatar></Nav.Item>
                    ))}
                </Nav.Menu>
            </Nav> */}
      <Nav pullRight>
        <Nav.Item
          onClick={onExpandStateChange}
          style={{ width: 56, textAlign: "center" }}
        >
          {expand ? <ArrowLeftLine /> : <ArrowRightLine />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const MainSidebar = () => {
  const [expand, setExpand] = useState(true);
  const [active, setActiveItem] = useState("/");
  const history = useNavigate();
  const { t } = useTranslation();

  const onSelect = (key) => {
    setActiveItem(key);
    if (key) history(key);
  };

  return (
    <Sidebar
      style={{ display: "flex", flexDirection: "column", height: "auto" }}
      width={expand ? 260 : 56}
      collapsible
    >
      <Sidenav.Header>
        <div
          style={{
            padding: 18,
            fontSize: 16,
            height: 56,
            background: "#34c3ff",
            color: " #fff",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {!expand && <Gear style={{ fontSize: 20 }} />}
          {expand && <span style={{ marginLeft: 12 }}> Admin Paneli</span>}
        </div>
      </Sidenav.Header>
      <Sidenav
        expanded={expand}
        // defaultOpenKeys={['3']}
        appearance="subtle"
      >
        {/* style={{ overflow: 'hidden auto', }} */}
        <Sidenav.Body>
          <Nav vertical={true} activeKey={active} onSelect={onSelect}>
            <Nav.Item eventKey="/" icon={<Setting />}>
              {t("pages.menu.home")}
            </Nav.Item>
            
            <Nav.Menu
              eventKey="4"
              title={t("pages.menu.education")}
              icon={<Gear />}
              placement="rightStart"
            >
              <Nav.Item eventKey="/educations/list">
                {t("pages.menu.educations")}
              </Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle
        expand={expand}
        onExpandStateChange={() => setExpand(!expand)}
      />
    </Sidebar>
  );
};

export default MainSidebar;
