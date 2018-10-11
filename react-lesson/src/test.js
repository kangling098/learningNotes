class SomeComponent extends React.PureComponent {
    get instructions() {
        if (this.props.do) {
            return 'Click the button: ';
        }
        return 'Do NOT click the button: ';
    }
    render() {
        return ( < div > {
                this.instructions
            } < Button onClick = {
                () = & gt;alert('!')
            }
            /></div > );
    }
}