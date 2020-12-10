import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from "./components/Palette";


class App extends Component {

    id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

    state = {
        input: '',
        todos: [
            { id: 0, text: ' 리액트 소개', checked: false , color: '#000'},
            { id: 1, text: ' 리액트 소개', checked: true , color: '#000'},
            { id: 2, text: ' 리액트 소개', checked: false , color: '#000'}
        ],
        color_infos: [
            {id : 0, color : '#343a40', selected : true},
            {id : 1, color: '#f03e3e', selected : false},
            {id : 2, color:'#12b886', selected : false},
            {id : 3, color:'#228ae6', selected : false}
            ],
        nowColor : '#343a40'
    }
    handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    }

    handleToggle = (id) => {
        const { todos } = this.state;

        // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index]; // 선택한 객체

        const nextTodos = [...todos]; // 배열을 복사

        // 기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        });
    }


    handleChange = (e) => {
        this.setState({
            input: e.target.value // input 의 다음 바뀔 값
        });
    }

    handleCreate = () => {
        const { input, todos, nowColor } = this.state;
        this.setState({
            input: '', // 인풋 비우고
            // concat 을 사용하여 배열에 추가
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false,
                color: nowColor
            })
        });
    }

    handleKeyPress = (e) => {
        // 눌려진 키가 Enter 면 handleCreate 호출
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    handlePaletteChange = (id) => {
        const { color_infos } = this.state;
        const index = color_infos.findIndex(color_info => color_info.id === id);
        const selected = color_infos[index];

        const next_color_infos = [...color_infos];

        for(var i = 0; next_color_infos.length > i ; i++)
        {
            next_color_infos[i] = {
                ...color_infos[i],
                selected: false
            }
        }

        next_color_infos[index] = {
            ...selected,
            selected: true
        };
        this.setState({
            color_infos: next_color_infos,
            nowColor: next_color_infos[index].color
        });
        console.log(this.state.nowColor);
    }

    render() {
        const { input, todos, color_infos } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove,
            handlePaletteChange

        } = this;

        return (
            <TodoListTemplate
                palette={
                    <Palette
                        colors={color_infos}
                        onSelect={handlePaletteChange}
                    />
                }
                form={(
                    <Form
                        value={input}
                        onKeyPress={handleKeyPress}
                        onChange={handleChange}
                        onCreate={handleCreate}
                    />
                )}
                children={
                    <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
                }


            >
            </TodoListTemplate>
        );
    }
}

export default App;