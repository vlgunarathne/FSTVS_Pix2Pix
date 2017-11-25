/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import Delete from 'material-ui-icons/Delete';
import FileUpload from 'material-ui-icons/FileUpload';
import Save from 'material-ui-icons/Save';
import axios from 'axios';
const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
    paper: {
        height: 500,
        width: 500,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    card: {
        width: 345,
        margin:'50px',
        textAlign:'center',
    },
    media: {
        height: 260,
        padding: '30px',
    },
    wrapper: {
        marginTop: theme.spacing.unit*25,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class PersistentDrawer extends React.Component {
    state = {
        open: false,
        anchor: 'left',
        spacing: '16',
        loading: false,
        success: false,
        thermalImageUrl: 'upload_icon.png',
        file:''
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChangeAnchor = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false,
                            success: true,
                        });
                    }, 5000);
                },
            );
        }
    };
    handleUploadFile = (event) => {
        const data = new FormData();
        let reader = new FileReader();
        let file = event.target.files[0];
        data.append('file', file);
        data.append('name', 'some value user types');
        data.append('description', 'some value user types');
        // '/files' is your node.js route that triggers our middleware
        axios.post('http://localhost:5000/uploader', data)
        .then((response) => {
        console.log(response); // do something with the response
          reader.onloadend = () => {
          this.setState({
            file: file,
            thermalImageUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    handleRemove = () => {
        this.setState({thermalImageUrl: 'upload_icon.png'});
    }
    timer = undefined;
    render() {
        const { classes, theme } = this.props;
        const { anchor, open } = this.state;
        const { loading, success } = this.state;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
        });
        const drawer = (
            <Drawer
                type="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={anchor}
                open={open}
            >
                <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>

                        <ListItem button component="a" href="train">
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Train" />

                        </ListItem>


                        <ListItem button component="a" href="test">
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Test" />
                        </ListItem>

                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemText primary="Trash" />
                        </ListItem>

                    </List>
                    <Divider />
                </div>
            </Drawer>
        );

        let before = null;
        let after = null;

        if (anchor === 'left') {
            before = drawer;
        } else {
            after = drawer;
        }

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                            [classes[`appBarShift-${anchor}`]]: open,
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="contrast"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" noWrap>
                                FSTVS 1.0 - Face Synthesis from Thermal to Visible Spectrum
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {before}
                    <main
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-${anchor}`]]: open,
                        })}
                    >
                        <Typography type="body1" style={{textAlign:"center"}}>
                            
                        </Typography>
                        
                        <Grid container className={classes.root}>
                            <Grid item xs={12}>
                                <Grid container className={classes.demo} justify="center" spacing={40}>
                                    <div>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.media}
                                                
                                                title="Contemplative Reptile"
                                                
                                            ><img src={this.state.thermalImageUrl} style={{width:"250px",height:"250px"}}/></CardMedia>
                                            <Divider/>
                                            <CardContent>
                                                <Typography type="headline" component="h2">
                                                    Thermal Image
                                                </Typography>
                                                
                                            </CardContent>
                                            <CardActions>
                                                <input
                                                    accept="image/*"
                                                    className={classes.input}
                                                    id="raised-button-file"
                                                    multiple
                                                    type="file"
                                                    onChange={this.handleUploadFile}
                                                />
                                                <label htmlFor="raised-button-file">
                                                    <Button raised component="span" color="primary" className={classes.button}>
                                                        Upload <FileUpload/>
                                                    </Button>
                                                </label>
                                                <Button raised color="accent" className={classes.button} onClick={this.handleRemove}>
                                                    Remove <Delete/>
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </div>
                                    {/*///////////////////////////////////////////////////////////*/}
                                    <div>

                                        <div className={classes.wrapper}>
                                            <Button
                                                raised
                                                color="primary"
                                                className={buttonClassname}
                                                disabled={loading}
                                                onClick={this.handleButtonClick}
                                            >
                                                PROCESS
                                            </Button>
                                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </div>
                                    </div>
                                    {/*///////////////////////////////////////////////////////////*/}
                                    <div>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.media}
                                                image="../public/favicon.ico"
                                                title="Contemplative Reptile"
                                            ><img src="input.png" /></CardMedia>
                                            <Divider/>
                                            <CardContent>
                                                <Typography type="headline" component="h2">
                                                    Visible Image
                                                </Typography>
                                                
                                            </CardContent>
                                            <CardActions>
                                                <Button className={classes.button} raised dense>
                                                    <Save/>
                                                    Save
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </main>
                    {after}
                </div>
            </div>
        );
    }
}

PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);