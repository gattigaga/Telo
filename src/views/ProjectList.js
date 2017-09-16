import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';
import ProjectItem from '../components/ProjectItem';
import EmptyCaption from '../components/EmptyCaption';

class ProjectList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            projects
        } = this.props;

        return (
            <View style={styles.container}>
                <Header title="My Projects" />
                {projects.length > 0 ? (
                    <ScrollView style={{ flex: 1, marginTop: 32 }}>
                        {projects.map((project) => {
                            return (
                                <ProjectItem
                                    key={project.id}
                                    name={project.name} />
                            );
                        })}
                    </ScrollView>
                ) : (
                    <EmptyCaption>
                        No projects found, let's create one
                    </EmptyCaption>
                )}
            </View>
        );
    }
}

ProjectList.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16
    },
});

function mapStateToProps(state) {
    return {
        projects: state.projects,
    }
}

export default connect(
    mapStateToProps
)(ProjectList);