import React from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Text,
} from 'react-native'
import {Button} from 'react-native-elements'
import {Button as Link} from 'react-native'
import {connect} from 'react-redux'
import styles from './DayInputScreenStyle'
import {loadAll, loadAllStepsSince} from 'ducks/days'
import {loginWithFitbit, loginWithGoogle} from 'ducks/user'
import {getDateKeyDayAgo} from 'util/TimeUtil'

import {loadAllDays, deleteAll} from 'service/database'
import {fetchDays} from 'service/firebaseService'

class ProfileScreen extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        //actions
        refreshState: PropTypes.func,
        connectFitbit: PropTypes.func,
        loadSteps: PropTypes.func,
        loginGoogle: PropTypes.func,
        getDays: PropTypes.func,
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }

    render() {
        const {
            refreshState,
            connectFitbit,
            user,
            loadSteps,
            loginGoogle,
            getDays,
        } = this.props
        return <View style={styles.container}>
            <Text>Dev Screen</Text>
            <View>
                <Link onPress={refreshState} title={'Refresh All State'}/>
            </View>
            <View>
                <Link onPress={() => loadAllDays()} title={'Load All'}/>
            </View>
            <View>
                <Link onPress={() => deleteAll()} title={'Delete All'}/>
            </View>

            <View style={{marginBottom: 10}}>
                <Button onPress={() => connectFitbit()} title='Login With Fitbit' display-if={!user.fitbit.isLoggedIn}/>
                <View>
                    <Text display-if={user.isLoading}>Loading...</Text>
                    <Text display-if={user.fitbit.userId}>UserID = {user.fitbit.userId}</Text>
                </View>
            </View>
            <View style={{marginBottom: 10}}>
                <Button onPress={() => loadSteps()} title={'Load steps for last 7 days'}/>
            </View>

            <View style={{marginBottom: 10}}>
                <Button onPress={() => loginGoogle()} title={'Login With Google'}/>
            </View>

            <View style={{marginBottom: 10}}>
                <Button onPress={() => getDays()} title={'Fetch all data'}/>
            </View>
        </View>
    }

}

const mapStateToProps = (state, ownProps) => {
    let user = state.user.toJS()
    return {
        user,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        refreshState: () => {
            dispatch(loadAll())
        },
        connectFitbit: () => {
            dispatch(loginWithFitbit())
        },
        loadSteps: () => {
            const dayKey = getDateKeyDayAgo(2)
            dispatch(loadAllStepsSince(dayKey))
        },
        loginGoogle: () => {
            dispatch(loginWithGoogle())
        },
        getDays: async () => {
            const days = await fetchDays({})
            console.log('fetch days on ProfileScreen', days)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)