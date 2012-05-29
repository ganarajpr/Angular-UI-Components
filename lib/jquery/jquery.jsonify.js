/**
 * Created with JetBrains WebStorm.
 * User: ganaraj.permunda
 * Date: 11/05/12
 * Time: 15:07
 * To change this template use File | Settings | File Templates.
 */

(function( $ ) {
    $.extend({
        xml2json :function(xml) {
            if(!xml) return {};
            stringToXML = function(txt)
            {
                var xmlDoc,parser;
                if (window.DOMParser)
                {
                    parser=new DOMParser();
                    xmlDoc=parser.parseFromString(txt,"text/xml");
                }
                else // Internet Explorer
                {
                    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async=false;
                    xmlDoc.loadXML(txt);
                }
                return xmlDoc;
            }

            parseXML = function(xmlNode)
            {
                function Node(nm) {
                    this.name = nm;
                    this.nodes =[];
                    this.text = "";
                    this.attributes = [];
                    this.addAttribute = function(name,value) {

                        this.attributes.push({nodeName:name,nodeValue:value});
                    };
                    this.addNode = function(name) {
                        var nd = new Node(name);
                        this.nodes.push(nd);
                        return nd;
                    };
                    this.deleteNode = function() {

                        this.nodes = [];
                    }

                    this.attr = function(attrName){
                        for( var i = 0; i< this.attributes.length;i++)
                        {
                            if( this.attributes[i].nodeName === attrName)
                            {
                                return this.attributes[i].nodeValue;
                            }
                        }
                    }
                }
                if(!xmlNode) return 0;
                var node = new Node(xmlNode.nodeName);
                if(xmlNode.textContent)
                {
                    node.text = xmlNode.textContent;
                }
                var attr = xmlNode.attributes;
                if(attr)
                {
                    for (var i = 0; i < attr.length; i++)
                    {
                        //node.attributes.push({nodeName:attr[i].nodeName,nodeValue:attr[i].nodeValue});
                        //node.attributes[attr[i].nodeName] = attr[i].nodeValue;
                        node.addAttribute(attr[i].nodeName,attr[i].nodeValue);
                    }
                }
                var childNodes = xmlNode.childNodes;
                if(childNodes)
                {
                    for (var i = 0; i < childNodes.length; i++)
                    {
                        if(childNodes[i].nodeName !== "#text")
                        {
                            var ret = parseXML(childNodes[i]);
                            if(ret)
                            {
                                node.nodes.push(ret);
                            }

                        }
                    }
                }
                return node;
            }
            if(typeof xml=='string')
            {
                xml = stringToXML(xml);
            }
            if(xml.documentElement)
            {
                return parseXML(xml.documentElement);
            }
            else
            {
                return "";
            }
        }
    });
})( jQuery );
