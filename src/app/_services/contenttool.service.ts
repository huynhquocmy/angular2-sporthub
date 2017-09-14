import { Injectable }  from '@angular/core';
declare var ContentTools: any;
declare var ContentEdit: any;
declare var window: any;
declare var $: any;
declare var _: any;

@Injectable()

export class ContenttoolService {
  content: any = {};
  autoSaveTimer: any = 0;
  callback: Function;
  constructor() {
    ContentEdit.PREFER_LINE_BREAKS = true;
  }

  init(callback: Function) {
    let me = this;
    this.callback = callback;
    this.defaults();
    window.content = ContentTools.EditorApp.get();
    window.content.init('.text-editable', 'dataname');
    window.content.addEventListener('saved', function (ev) {
        var regions;
        regions = ev.detail().regions;
        if (Object.keys(regions).length === 0) {
            return;
        }
        me.save(regions);
    });

    // Add support for auto-save
    window.content.addEventListener('start', function () {
        var _this = this;
        function autoSave() {
            _this.save(true);
        }
        this.autoSaveTimer = setInterval(autoSave, 4 * 1000);
    });

    window.content.addEventListener('stop', function () {
        clearInterval(this.autoSaveTimer);
    });

    window.content.start();
    window.content.syncRegions();
    $('.ct-toolbox').hide();

    $(document).mousedown(function (e) {
        var container = $(".text-editable"),
            popup = $(".ct-toolbox");
        if (!container.is(e.target) && container.has(e.target).length === 0 && !popup.is(e.target) && popup.has(e.target).length === 0) {
            container.find('.ce-element--focused').removeClass('ce-element--focused');
            $('.ct-toolbox').hide();
        } else {
            $('.ct-toolbox').show();
        }
    });
  }

  defaults () {
    ContentTools.DEFAULT_TOOLS = [
      [
          'bold',
          'italic',
          'link',
          'align-left',
          'align-center',
          'align-right'
      ],
      [
          'heading',
          'subheading',
          'paragraph',
          'unordered-list',
          'ordered-list',
          'indent',
          'unindent',
          // 'line-break'
          'undo',
          'redo'
          // 'remove'
      ]
    ];
  }

  save (regions: any) {
    this.callback(regions);
  };
}
