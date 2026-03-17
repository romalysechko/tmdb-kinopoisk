import type { SxProps, Theme } from "@mui/material";

export const filtersPaperStyles: SxProps<Theme> = {
    width: {
        xs: '100%',
        md: 280
    },
    p: {
        xs: 2,
        md: 3
    },
    height: 'fit-content',
    position: {
        xs: 'relative',
        md: 'sticky'
    },
    top: {
        xs: 0,
        md: 20
    },
    flexShrink: 0,
    bgcolor: 'background.paper',
    borderRadius: {
        xs: 0,
        md: 3
    },
    border: '1px solid',
    borderColor: 'divider',
    mb: {
        xs: 3,
        md: 0
    },
    boxSizing: 'border-box'
};

export const filterTitleStyles: SxProps<Theme> = {
    mb: 3,
    fontWeight: 'bold',
    textAlign: {
        xs: 'center',
        md: 'left'
    }
};

export const filterFormControlStyles: SxProps<Theme> = {
    mb: 4,
    width: '100%'
};

export const ratingContainerStyles: SxProps<Theme> = {
    px: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: {
        xs: 'center',
        md: 'flex-start'
    }
};

export const ratingTextStyles: SxProps<Theme> = {
    mb: 1,
    color: 'text.secondary',
    fontSize: {
        xs: '0.875rem',
        md: '1rem'
    }
};
