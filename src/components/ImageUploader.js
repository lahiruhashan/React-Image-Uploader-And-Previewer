import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {uploadImage} from "../actions/uploadActions";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        marginLeft: '30%'
    },
    input: {
        display: 'none',
    },
    image: {
        position: 'relative',
        height: 300,
        width: 250,
        boxShadow: `0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)`,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageMarkedPrice': {
                backgroundColor: 'black',
            },
            '& $imageTitle': {
                border: '1px solid currentColor',
                backgroundColor: '#252525c2',
            }
        },
        margin: '20px 2%'
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
        transition: theme.transitions.create('background'),
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
    imageMarkedPrice: {
        padding: '5px',
        borderRadius: '5px',
        transition: theme.transitions.create('background'),
    },
    imageChangeButton: {
        marginTop: 20,
        marginLeft: 130
    },
    imageName: {
        marginTop: 20
    },
    finalText: {
        marginTop: 20,
        textAlign: 'center'
    }
}));

const ImageUploader = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [imageName, setImageName] = useState("");
    const {image} = useSelector(state => state.upload);

    const handleUploadClick = event => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        setImageData(imageData);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadImageWithAdditionalData = () => {
        imageData.append('imageName', imageName);
        dispatch(uploadImage(imageData));
    };

    const handleChange = event => {
        setImageName(event.target.value)
    };

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={
                                    imagePreview !== null ?
                                        imagePreview :
                                        "https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image.jpg"}
                            />
                        </CardActionArea>
                    </Card>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="upload-profile-image"
                        type="file"
                        onChange={handleUploadClick}
                    />
                    <label htmlFor="upload-profile-image">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.imageChangeButton}
                            component="span"
                        >
                            Change Image
                        </Button>
                    </label>
                    <TextField
                        fullWidth
                        label="Image Name"
                        margin="dense"
                        name="name"
                        className={classes.imageName}
                        onChange={handleChange}
                        required
                        value={imageName}
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.imageChangeButton}
                        onClick={() => uploadImageWithAdditionalData()}
                    >
                        Upload Image
                    </Button>
                    <Typography className={classes.finalText}>{image === null ? "Select An Image To Upload" : "Image Uploaded. Saved as " + image}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ImageUploader;