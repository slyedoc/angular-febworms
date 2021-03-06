angular.module('febworms').factory('febwormsUtils', function ($templateCache, $http, $window, febwormsConfig) {

    var uniqueCounter = (+new Date) % 10000;

    return {
      getScrollOffset: function() {

        // the pageYOffset property of the window object is supported in all browsers except 
        // in Internet Explorer before version 9, and always returns the scroll amount regardless of the doctype
        
        // the scrollY property of the window object is supported by Firefox, Google Chrome and Safari, and always
        // returns the scroll amount regardless of the doctype
        
        // if a doctype is specified in the document, the scrollTop property of the html element returns the scroll
        // amount in Internet Explorer, Firefox and Opera, but always returns zero in Google Chrome and Safari
        
        // if no doctype is specified in the document, the scrollTop property of the html element always returns zero

        // if no doctype is specified in the document, the scrollTop property of the body element returns the 
        // scroll amount in Internet Explorer, Firefox, Opera, Google Chrome and Safari.

        var offset = {};

        if($window.pageYOffset !== undefined) {
          offset.x = $window.pageXOffset;
          offset.y = $window.pageYOffset;
        } else {
          var de = $window.document.documentElement;
          offset.x = de.scrollLeft;
          offset.y = de.scrollTop;
        }

        return offset;
      },
      defaultArea: 'default',
      getRenderInfo: function(field) {
        //var renderInfo = febworms.Field[field.type];
        var renderInfo = febwormsConfig.fields.renderInfo[field.type];

        if(!renderInfo) {
          renderInfo = {};
          // febworms.Field[field.type] = renderInfo;
          febwormsConfig.fields.renderInfo[field.type] = renderInfo;
        }

        if(!renderInfo.templateUrl) {
          renderInfo.templateUrl = this.getTemplateUrl(field);
        }

        if(!renderInfo.propertiesTemplateUrl) {
          renderInfo.propertiesTemplateUrl = this.getTemplateUrl(field, 'properties');
        }

        return renderInfo;
      },
      formatTemplateUrl: function (type, area) {
        return 'components/febworms/field-templates/' + (area || this.defaultArea) + '/' + type + '.tmpl.html';
      },
      getTemplateUrl: function (field, area) {

        area = area || this.defaultArea;

        // IE8 fix: Aliases removed
        // var templateType = febwormsConfig.fields.aliases[field.type] || field.type;
        var templateType = field.type;
        var templateUrl = this.formatTemplateUrl(templateType, area);

          if (area !== 'properties' && area !== this.defaultArea) {
              templateUrl = this.getTemplateUrl(field, this.defaultArea);
          }

        //console.log(templateUrl);
        //var cached =  $templateCache.get(templateUrl);
        //
        //if (!cached) {
        //
        //  // Url is not in cache -- fallback to default area.
        //  // Properties area will never fallback to default area.
        //
        //  if (area !== 'properties' && area !== this.defaultArea) {
        //    templateUrl = this.getTemplateUrl(field, this.defaultArea);
        //  } else {
        //    return this.formatTemplateUrl('not-in-cache');
        //  }
        //}

        return templateUrl;
      },
      getUnique: function() {
        return ++uniqueCounter;
      },
      copyField: function(field) {
        var copy = angular.copy(field);
        copy.name = 'field' + this.getUnique();
        return copy;
      },
      findElementsByClass: function (root, className, recursive, buffer) {
        buffer = buffer || [];

        if (root.className === className) {
          buffer.push(root);
        }

        if (root.hasChildNodes()) {
          for (var i = 0; i < root.children.length; i++) {
            var child = root.children[i];
            if (child.className === className) {
              buffer.push(child);
            }
            if (recursive) {
              this.findElementsByClass(child, className, recursive, buffer);
            }
          }
        }
        return buffer;
      }
    };
  });