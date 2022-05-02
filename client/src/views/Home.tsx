import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import CardGrid from '../components/CardGrid/CardGrid';
import LinkNav from '../components/CardGrid/LinkNav';
import CarouselSimple from '../components/Carousel';

export default function HomeSearch() {
    const [category, setCategory] = useState('');
    return (
        <div className='full-page-with-nav mt-5'>
            <Container fluid>
                <CarouselSimple deviceType='desktop' setCategory={setCategory} />
            </Container>
            <Container className="row h-100 p-5" fluid>
                {/* <LinkNav/> */}
                <hr />
                <CardGrid category={category}/>
            </Container>

        </div>
    );
}