import type {SxProps, Theme} from "@mui/material";

export const cardStyles: SxProps<Theme>  = {
    width: "100%",
    maxWidth: 200,
    cursor: "pointer",
    transition: "transform 0.3s ease",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:hover": {
        transform: "translateY(-5px)",
        "& .favorite-btn": {
            opacity: 1,
            visibility: "visible",
        },
    },
};

export const imageWrapperStyles: SxProps<Theme> = {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    aspectRatio: "2/3",
    backgroundColor: "#f0f0f0",
    width: "100%",
};

export const badgeStyles = (rating: number): SxProps<Theme> => {
    let bgColor = "#db2360"; // low
    if (rating >= 7) bgColor = "#21d07a"; // high
    else if (rating >= 4) bgColor = "#d2d531"; // medium

    return {
        position: "absolute",
        bottom: 10,
        left: 10,
        padding: "4px 8px",
        borderRadius: "50px",
        fontSize: "10px",
        fontWeight: 800,
        color: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
        zIndex: 2,
        backgroundColor: bgColor,
    };
};

export const favoriteBtnStyles: SxProps<Theme> = {
    position: "absolute !important",
    top: 10,
    right: 10,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease, transform 0.2s ease !important",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(4px)",
    color: "white",
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    "&.is-favorite": {
        opacity: 1,
        visibility: "visible",
    }
};

export const titleClampStyles: SxProps<Theme> = {
    marginTop: "10px",
    fontSize: "15px",
    fontWeight: 600,
    color: "text.primary",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    overflow: "hidden",
    minHeight: "2.6em",
    lineHeight: 1.3,
};
