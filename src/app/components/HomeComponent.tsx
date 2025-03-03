import React from 'react'
import Navbar from './Navbar'
import StoryList from './StoryList'
import { Story } from '@/types/story'


interface HomeComponentProps {
    stories: Story[];
}

const HomeComponent: React.FC<HomeComponentProps> = ({stories}) => {
    return (
        <>
            <Navbar />
            <StoryList stories = {stories || []}/>
            {/* {console.log(stories)} */}
        </>
    )
}

export default HomeComponent