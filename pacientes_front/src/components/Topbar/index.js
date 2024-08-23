import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";

const pages = [{nome: 'Home', url: '/'}, {nome: 'Novo', url: '/novo'}];

export default function Topbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    useEffect(() => {
        console.log("user", user);
    }, [user]);

    async function teste()
    {
        const token = await getAccessTokenSilently();
        console.log("token =>", token);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={teste}
                    >
                        Pacientes
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem component={"a"} href={page.url} key={page.nome} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.nome}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Pacientes
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.nome}
                                onClick={handleCloseNavMenu}
                                href={page.url}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.nome}
                            </Button>
                        ))}
                        <div style={{position: "absolute", right: 0}}>
                            {!user &&
                                <Button
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        loginWithRedirect();
                                    }}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    Login
                                </Button>
                            }
                            {user && (
                                <Button
                                    onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                    Sair
                                </Button>
                            )}
                        </div>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}