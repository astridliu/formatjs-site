/* global React */

import Example from './example';
import CodeBlock from './code-block';
import DustOutput from './dust-output';
import {Tabs, Tab} from './tabs';

export default React.createClass({
    displayName: 'DustExample',

    propTypes: {
        id: React.PropTypes.string.isRequired,

        source: React.PropTypes.shape({
            template: React.PropTypes.string.isRequired,
            context : React.PropTypes.string.isRequired,
            intlData: React.PropTypes.string.isRequired
        }).isRequired,

        context : React.PropTypes.object.isRequired,
        message : React.PropTypes.string,
        formats : React.PropTypes.object,
        messages: React.PropTypes.object,

        currentLocale   : React.PropTypes.string.isRequired,
        availableLocales: React.PropTypes.array.isRequired,
        onLocaleChange  : React.PropTypes.func.isRequired,
    },

    render: function () {
        var props = this.props;

        var tabs = [
            <Tab label="Template" key="template" id={`${props.id}-template`}>
                <CodeBlock lang="dust">
                    {props.source.template}
                </CodeBlock>
            </Tab>,

            <Tab label="Context" key="context" id={`${props.id}-context`}>
                <CodeBlock lang="javascript">
                    {props.source.context}
                </CodeBlock>
            </Tab>,

            <Tab label="Render" key="render" id={`${props.id}-render`}>
                <CodeBlock lang="javascript">
{`context.intl = ${props.source.intlData};

dust.render(template, context, function (err, html) {
    // Put \`html\` into the DOM or use it otherwise...
});`}
                </CodeBlock>
            </Tab>
        ];

        // Insert a "Message" tab if the example uses an i18n message.
        if (props.message) {
            tabs.splice(1, 0,
                <Tab label="Message" key="message" id={`${props.id}-message`}>
                    <CodeBlock highlight={false}>
                        {props.message}
                    </CodeBlock>
                </Tab>
            );
        }

        return (
            <Example
                id={props.id}
                currentLocale={props.currentLocale}
                availableLocales={props.availableLocales}
                onLocaleChange={props.onLocaleChange}
                source={<Tabs>{tabs}</Tabs>}
                output={
                    <DustOutput
                        id={props.id}
                        locales={props.currentLocale}
                        formats={props.formats}
                        messages={props.messages}
                        source={props.source.template}
                        context={props.context} />
                } />
        );
    }
});
