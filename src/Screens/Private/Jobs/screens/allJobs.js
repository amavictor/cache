import { ScrollView } from 'react-native'
import React from 'react'
import { JobCard } from '../components'
import { ScaledSheet } from 'react-native-size-matters';

export const AllJobs = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <JobCard />
            <JobCard />
            <JobCard />
        </ScrollView>
    )
}

const styles = ScaledSheet.create({
    scrollView: {
        gap:"10@vs"
    }
})