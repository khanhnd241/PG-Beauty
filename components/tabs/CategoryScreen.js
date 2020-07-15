import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import { RECTANGLE } from '../../constants/images/rectangle';
import { SEARCH } from '../../constants/images/search';
import { STAR } from '../../constants/images/star';
import { SCAN } from '../../constants/images/scan';
import { BASKET } from '../../constants/images/basket';
import { PG_BEAUTY } from '../../constants/images/pg_beauty';
import { PG_FASHION } from '../../constants/images/pg_fashion';
import { PG_TOOL } from '../../constants/images/pg_tool';
import { PLUS } from '../../constants/images/plus';
import { SUB } from '../../constants/images/sub';
class CategoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beauty: false,
            tool: false,
            fashion: false,
            cleansing: false
        };
    }
    openBeauty = () => {
        this.setState({ beauty: !this.state.beauty })
    }
    openTool = () => {
        this.setState({ tool: !this.state.tool })
    }
    openFashion = () => {
        this.setState({ fashion: !this.state.fashion })
    }
    openCleansing = () => {
        this.setState({ cleansing: !this.state.cleansing })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                 <StatusBar backgroundColor='#BE1E2D' />
                <View style={styles.header}>
                    <View style={styles.inputHeader}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <SvgUri svgXmlData={SEARCH} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput placeholder={STRING.SEARCH_INPUT} placeholderTextColor='#6C7783' style={{ flex: 5, fontSize: 15 }}></TextInput>

                        </View>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                            <SvgUri svgXmlData={SCAN} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <SvgUri svgXmlData={BASKET} />
                    </TouchableOpacity>
                </View>
                <View>
                    {/* PG Beauty */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <SvgUri svgXmlData={PG_BEAUTY} />
                        </View>
                        <View style={{ flex: 4, flexDirection: 'row' }}>
                            <Text style={styles.text}>{STRING.PG_BEAUTY}</Text>
                        </View>
                        <TouchableOpacity onPress={this.openBeauty} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {this.state.beauty ? (
                                <SvgUri svgXmlData={SUB} width={15} height={20} />
                            ) : (
                                    <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                )}
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopWidth: 0.5, borderTopColor: '#E0E0E0' }} />
                    {this.state.beauty ? (
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                <View style={{ flex: 1 }} />
                                <View style={{ flex: 4 }}>
                                    <Text style={styles.text}>{STRING.CLEANSING}</Text>
                                </View>
                                <TouchableOpacity onPress={this.openCleansing} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.cleansing ? (
                                        <SvgUri svgXmlData={SUB} width={15} height={20} />
                                    ) : (
                                            <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                        )}
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderTopWidth: 0.5, borderTopColor: '#E0E0E0' }} />
                            {this.state.cleansing ? (
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                        <View style={{ flex: 1.5 }} />
                                        <View style={{ flex: 5 }}>
                                            <Text style={styles.text}>{STRING.CLEANSER}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderTopWidth: 0.5, borderTopColor: '#E0E0E0' }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                        <View style={{ flex: 1.5 }} />
                                        <View style={{ flex: 5 }}>
                                            <Text style={styles.text}>{STRING.CLEANSING}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderTopWidth: 0.5, borderTopColor: '#E0E0E0' }} />
                                </View>
                            ) : null}
                        </View>

                    ) : null}
                    {/* PG Beauty Tool */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                        <View style={{ flex: 1,  alignItems: 'center' }}>
                            <SvgUri svgXmlData={PG_TOOL} />
                        </View>
                        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>{STRING.PG_BEAUTY_TOOL}</Text>
                        </View>
                        <TouchableOpacity onPress={this.openTool} style={{ flex: 1, alignItems: 'center' }}>
                            {this.state.tool ? (
                                <SvgUri svgXmlData={SUB} width={15} height={20} />
                            ) : (
                                    <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                )}
                        </TouchableOpacity>
                    </View>
                    {/* PG Beauty Fashion */}
                    <View style={{ borderTopWidth: 0.5, borderTopColor: '#E0E0E0' }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <SvgUri svgXmlData={PG_FASHION} />
                        </View>
                        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>{STRING.PG_FASHION}</Text>
                        </View>
                        <TouchableOpacity onPress={this.openFashion} style={{ flex: 1, alignItems: 'center' }}>
                            {this.state.fashion ? (
                                <SvgUri svgXmlData={SUB} width={15} height={20} />
                            ) : (
                                    <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                )}
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopWidth: 0.5, borderTopColor: '#E0E0E0' }} />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#BE1E2D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputHeader: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 30,
        width: 310,
        height: 40,
        marginBottom: 5,
        marginRight: 20,
        alignItems: 'center',
        marginTop: 10
    },
    text: {
        fontSize: 14,
        color: '#2E3E4E',
    }
})
export default CategoryScreen;