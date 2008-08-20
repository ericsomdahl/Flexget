import logging

__pychecker__ = 'unusednames=parser'

log = logging.getLogger('extension')

class ModifyExtension:

    """
        Allows specifying file extension explicitly when all other built-in detection mechanisms fail.
    
        Example:

        extension: nzb
    """

    def register(self, manager, parser):
        manager.register('extension')

    def validate(self, config):
        if isinstance(config, str) or isinstance(config, int):
            return []
        else:
            return ['extension is not string or number']

    def feed_modify(self, feed):
        ext = feed.config.get('extension')
        if not ext.startswith('.'):
            ext = '.%s' % ext
        for entry in feed.entries:
            if not entry.has_key('filename'):
                entry['filename'] = '%s%s' % (entry['title'], ext)
                log.debug('generated filename %s' % entry['filename'])
