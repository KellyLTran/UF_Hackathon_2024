import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function Stats({ content, isOpen, toggleDrawer, requestRecommendations }) {
    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            enableOverlay={false}
            direction="right"
            className="bla bla bla"
            zIndex={9999}
            style={{
                position: "absolute",
                height: "90%",
                bottom: 0,
                top: "none",
            }}
        >
            <div>Show hurricane info, and damage assessment here</div>
            <div>{content}</div>
            <button onClick={toggleDrawer}>close</button>
            <button onClick={requestRecommendations}>
                request recommendations
            </button>
        </Drawer>
    );
}

export default Stats;
