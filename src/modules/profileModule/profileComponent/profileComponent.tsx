import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./profileComponent.scss";

const ProfileComponent: React.FC = () => {
    return (
        <div className="profileContainer df jc ac">
            <div className="profileMainInfo df js ac">
            <div className="matrix-card-container full-width">
                                <Card>
                                    {/* <CardMedia
                                        component="img"
                                        alt="Rajat Tripathi"
                                        height="140"
                                        image="https://picsum.photos/id/5/200"
                                    /> */}
                                    <CardContent>
                                        <Typography className="w300p ellipsis" gutterBottom variant="h5" component="div">
                                        Rajat Tripathi
                                        </Typography>
                                        <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                                            Software Engineer
                                        </Typography>
                                        <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                                            Experience: 2 years
                                        </Typography>
                                        <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                                            Technology: Javascript, NodeJs, React
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
            </div>
        </div>
    )
}

export { ProfileComponent }