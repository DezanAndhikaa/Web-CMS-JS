import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Cards from '../../Status/components/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Buttons from './Buttons';
import Typography from '@material-ui/core/Typography';
import { Autorenew } from '@material-ui/icons';

const useStyles = makeStyles({
	root: {
		minWidth: 300,
		maxWidth: 300,
		minHeight: 500,
		maxHeight: 500,
		marginRight: 10,
		overflowY: 'auto'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function LayoutSite() {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
          SITE
				</Typography>
			</CardContent>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			{/* <CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions>
			<CardActions>
				<Buttons />
			</CardActions> */}
		</Card>
	);
}
