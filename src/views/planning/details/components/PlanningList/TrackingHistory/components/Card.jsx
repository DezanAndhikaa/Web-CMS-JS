import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import '../../../../../../../components/FilterByTitle/DropdownFilter.scss';
import './Card.scss'

// const useStyles = makeStyles(theme => ({
// 	card: {
// 		display: 'inline-block',
// 		marginTop: 130,
// 		marginLeft: 20
// 	},
// 	details: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 	},
// 	content: {
// 		flex: '1 0 auto',
// 	},
// 	cover: {
// 		width: 551,
// 	},
// 	controls: {
// 		display: 'flex',
// 		alignItems: 'center',
// 		paddingLeft: theme.spacing(1),
// 		paddingBottom: theme.spacing(1),
// 	},
// 	playIcon: {
// 		height: 38,
// 		width: 38,
// 	},
// }));

export default function MediaControlCard() {
	return (
		<Card className="card-body">
			<div className="card-details">
				<CardContent className="card-contents">
					<Typography component="h5" variant="h5">
			Live From Space
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
			Mac Miller
					</Typography>
				</CardContent>
				<div className="card-controls"></div>
			</div>
		</Card>
	);
}