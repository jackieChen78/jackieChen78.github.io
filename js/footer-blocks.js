/**
 * 底部横向区块：分类 / 标签 / 归档 / 网站信息
 * 将这四个从侧边栏移到底部，横向排列
 */
(function () {
  'use strict';

  function buildFooterBlocks() {
    // 只在首页显示
    if (!document.querySelector('#recent-posts')) return;

    // 如果已经创建过，跳过
    if (document.querySelector('.footer-blocks')) return;

    // 从侧边栏获取数据
    const categoriesCard = document.querySelector('#aside-content .card-categories');
    const tagsCard = document.querySelector('#aside-content .card-tags');
    const archivesCard = document.querySelector('#aside-content .card-archives');
    const webinfoCard = document.querySelector('#aside-content .card-webinfo');

    // 创建容器
    const container = document.createElement('div');
    container.className = 'footer-blocks';
    container.id = 'footer-blocks';

    // 1. 分类
    if (categoriesCard) {
      const title = categoriesCard.querySelector('.item-headline')?.innerHTML || '<i class="fas fa-folder-open"></i> 分类';
      const list = categoriesCard.querySelector('ul')?.innerHTML || '<li>暂无分类</li>';
      container.innerHTML += `
        <div class="fb-item fb-categories">
          <div class="fb-title">${title}</div>
          <div class="fb-content"><ul>${list}</ul></div>
        </div>`;
    }

    // 2. 标签
    if (tagsCard) {
      const title = tagsCard.querySelector('.item-headline')?.innerHTML || '<i class="fas fa-tags"></i> 标签';
      const content = tagsCard.querySelector('.card-tag-list')?.innerHTML || '<span>暂无标签</span>';
      container.innerHTML += `
        <div class="fb-item fb-tags">
          <div class="fb-title">${title}</div>
          <div class="fb-content">${content}</div>
        </div>`;
    }

    // 3. 归档
    if (archivesCard) {
      const title = archivesCard.querySelector('.item-headline')?.innerHTML || '<i class="fas fa-archive"></i> 归档';
      const list = archivesCard.querySelector('ul')?.innerHTML || '<li>暂无归档</li>';
      container.innerHTML += `
        <div class="fb-item fb-archives">
          <div class="fb-title">${title}</div>
          <div class="fb-content"><ul>${list}</ul></div>
        </div>`;
    }

    // 4. 网站信息
    if (webinfoCard) {
      const title = webinfoCard.querySelector('.item-headline')?.innerHTML || '<i class="fas fa-chart-bar"></i> 网站信息';
      const content = webinfoCard.querySelector('.webinfo')?.innerHTML || '';
      container.innerHTML += `
        <div class="fb-item fb-webinfo">
          <div class="fb-title">${title}</div>
          <div class="fb-content">${content}</div>
        </div>`;
    }

    if (container.children.length === 0) return;

    // 插入到 footer 之前
    const footer = document.querySelector('#footer');
    if (footer) {
      footer.parentNode.insertBefore(container, footer);
    }
  }

  // DOM ready 后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFooterBlocks);
  } else {
    buildFooterBlocks();
  }

  // 支持 pjax 重载
  document.addEventListener('pjax:complete', buildFooterBlocks);
})();
