import * as dotenv from 'dotenv';
dotenv.config();
import express, { Response, json } from 'express';
import cookieParser from 'cookie-parser';
import UserRoutes from './controllers/User';
import RetasRoutes from './controllers/Retas';
import sendAsJson from './middleware/sendAsJson';
import errorHandler from './middleware/errorHandler';
import path from 'path';
import { sequelize } from './services/dbConfig';
import { isLoggedIn, getUser, RequestWithAuth } from './middleware/checkAuth';
import RetaController from './controllers/Retas/RetaController';
import { formatTime, getMonth, getWeekday } from './utils/dateTransforms';
import UserController from './controllers/User/UserController';

const app = express();
const PORT = 8081 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}));
app.use(json());
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// setup DB
(async () => await sequelize.sync())();


app.get('/', getUser, async (req: RequestWithAuth, res: Response) => {
    const categories = [
        { name: 'Todas', imgSrc: '/images/portero_retas.jpg' },
        { name: 'Futbol', imgSrc: '/images/futbol_cat.jpg' },
        { name: 'Baloncesto', imgSrc: '/images/basket_cat.jpg' },
        { name: 'Voleibol', imgSrc: '/images/voley_cat.jpg' },
        { name: 'Golf', imgSrc: '/images/golf_cat.jpg' },
        { name: 'Raquetbol', imgSrc: '/images/raquet_cat.jpg' },
        { name: 'eSports', imgSrc: '/images/esport_cat.jpg' },
        { name: 'Ajedrez', imgSrc: '/images/chess_cat.jpg' },
        { name: 'Otras', imgSrc: '/images/other_cat.jpg' }
    ];
    const allRetas = await RetaController.readAll();
    const retas = allRetas.map(reta => {
        return {
            id: reta.id,
            title: reta.name, 
            location: reta.location,
            category: reta.category,
            time: formatTime(reta.hours, reta.minutes),
            date: `${getWeekday(reta.date)} ${reta.date.getDate()} ${getMonth(reta.date)}`
        }
    })
    res.render("home", {user: req.user, categories, retas});
});

app.get('/user_profile', getUser, async (req: RequestWithAuth, res: Response) => {
    const retasAsAdminForUser = await UserController.getAllRetasForUserAsAdmin(req.user?.id)
    const retasAsAdmin = retasAsAdminForUser.map(reta => {
        return {
            id: reta.id,
            title: reta.name, 
            location: reta.location, 
            time: formatTime(reta.hours, reta.minutes),
            date: `${getWeekday(reta.date)} ${reta.date.getDate()} ${getMonth(reta.date)}`
        }
    });
    const retasAsParticipantForUser = await UserController.getAllRetasForUserAsParticipant(req.user?.id);
    const retasAsParticipant = retasAsParticipantForUser?.map(reta => {
        return reta ? {
            id: reta.id,
            title: reta.name, 
            location: reta?.location, 
            time: formatTime(reta?.hours, reta?.minutes),
            date: `${getWeekday(reta.date)} ${reta.date.getDate()} ${getMonth(reta.date)}`
        } : undefined
    })

    res.render("user_profile", {user: req.user, retasAsAdmin, retasAsParticipant});
});

app.get('/edit_user_profile', getUser, (req: RequestWithAuth, res: Response) => {
    // here we should render the home view
    res.render("edit_user", {user: req.user});
});

app.get('/login', getUser, (req: RequestWithAuth, res: Response) => {
    if (req.user) {
        res.redirect("/");
    }

    res.render("login", {user: req.user});
});

app.get('/register', getUser, (req: RequestWithAuth, res: Response) => {
    if (req.user) {
        res.redirect("/");
    }

    res.render("register", {user: req.user});
});

app.get('/create_reta', isLoggedIn, (req: RequestWithAuth, res: Response) => {
    res.render("new_reta", {user: req.user});
});

app.get('/reta_detail', isLoggedIn, (req: RequestWithAuth, res: Response) => {
    res.render("reta-detail", {user: req.user})
});

// User routes 
app.use('/user', UserRoutes)
// Retas routes
app.use('/retas', RetasRoutes)

// error handling middleware
app.use(errorHandler());
app.use(sendAsJson());

app.listen(PORT, () => console.log(`Express is listening at http://localhost:${PORT}`));