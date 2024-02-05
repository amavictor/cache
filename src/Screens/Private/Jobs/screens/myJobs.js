import { ScrollView } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { JobCard } from '../components'

export const MyJobs = () => {
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