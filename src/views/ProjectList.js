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
import ModalCreate from '../components/ModalCreate';

class ProjectList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            newProject:'', 
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.inputProject = this.inputProject.bind(this);
    }

    openModal() {
        this.setState({
            isModalOpen: true
        });
    }

    closeModal() {
        this.setState({
            isModalOpen: false
        });
    }

    inputProject(text) {
        this.setState({
            newProject: text
        });
    }

    render() {
        let {
            isModalOpen,
            newProject
        } = this.state;

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
                    <EmptyCaption onPress={this.openModal}>
                        No projects found, let's create one
                    </EmptyCaption>
                )}
                <ModalCreate 
                    isOpen={isModalOpen}
                    onPressCancel={this.closeModal}
                    onPressOK={() => {}}
                    onChangeText={this.inputProject}
                    value={newProject}
                    title="New Project" />
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