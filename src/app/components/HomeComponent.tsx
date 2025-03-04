import React from 'react'
import Navbar from './Navbar'
import StoryList from './StoryList'
import { Story } from '@/types/story'
import { PrivateRoute } from './PrivateRoute'


interface HomeComponentProps {
    stories: Story[];
}

const HomeComponent: React.FC<HomeComponentProps> = ({stories}) => {
    return (
        <PrivateRoute>
            <Navbar />
            <StoryList stories = {stories || []}/>
            {/* {console.log(stories)} */}
        </PrivateRoute>
    )
}

export default HomeComponent