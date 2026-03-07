import type {SxProps, Theme} from "@mui/material";

export const filtersPaperStyles: SxProps<Theme> = {
    width: 280,
    p: 3,
    height: 'fit-content',
    position: 'sticky',
    top: 20,
    flexShrink: 0,
    bgcolor: 'background.paper',
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
};

export const filterTitleStyles: SxProps<Theme> = {
    mb: 3,
    fontWeight: 'bold'
};

export const filterFormControlStyles: SxProps<Theme> = {
    mb: 4
};

export const ratingContainerStyles: SxProps<Theme> = {
    px: 1
};

export const ratingTextStyles: SxProps<Theme> = {
    mb: 1,
    color: 'text.secondary'
};
